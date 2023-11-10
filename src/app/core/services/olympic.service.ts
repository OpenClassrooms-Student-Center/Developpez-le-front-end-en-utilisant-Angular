import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Participation } from '../models/Participation';
import { PieData } from '../models/PieData';
import LineData from '../models/LineData';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  /**
   * Get all datas
   * @returns Observable<Olympic[]>
   */
  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  getOlympicById(id: number): Observable<Olympic | undefined> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]) =>
        olympics.find((olympic: Olympic) => olympic.id === id)
      )
    );
  }
  getOlympicIdByName(name: string): Observable<Olympic | undefined> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]) =>
        olympics.find((olympic: Olympic) => olympic.country === name)
      )
    );
  }
  /**
   *
   * @param id country's id
   * @returns country's total medals for all olympics games
   */
  getMedalsById(id: number): Observable<number | undefined> {
    return this.getOlympicById(id).pipe(
      map((olympic) =>
        olympic?.participations.reduce(
          (accumulator, currentValue) =>
            (accumulator += currentValue.medalsCount),
          0
        )
      )
    );
  }
  getAthletesById(id: number): Observable<number | undefined> {
    return this.getOlympicById(id).pipe(
      map((olympic) =>
        olympic?.participations.reduce(
          (accumulator, currentValue) =>
            (accumulator += currentValue.athleteCount),
          0
        )
      )
    );
  }
  getParticipationsById(id: number): Observable<number | undefined> {
    return this.getOlympicById(id).pipe(
      map((olympic) => olympic?.participations.length)
    );
  }
  /**
   * Tri les données et récupère le total de participations aux Jeux olympiques
   */
  getTotalJo(): Observable<number> {
    return this.olympics$.pipe(
      map((olympics) =>
        olympics?.reduce(
          (
            accumulator: number,
            currentValue: { participations: Participation[] }
          ) => accumulator + currentValue.participations.length,
          0
        )
      )
    );
  }

  /**
   *
   * @returns Les données pour le graphique type Pie
   */
  getPieData(): Observable<PieData[]> {
    return this.olympics$.pipe(
      map((olympics) => {
        return olympics.map((olympic: Olympic) => ({
          name: olympic.country,
          value: olympic.participations.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.medalsCount,
            0
          ),
        }));
      })
    );
  }
  getLineDataById(id: number): Observable<LineData[]> {
    return this.getOlympicById(id).pipe(
      map((result) => [
        {
          name: result?.country || '',
          series: (result?.participations || []).map((element) => ({
            name: element.year.toString(),
            value: element.medalsCount,
          })),
        },
      ])
    );
  }
}
