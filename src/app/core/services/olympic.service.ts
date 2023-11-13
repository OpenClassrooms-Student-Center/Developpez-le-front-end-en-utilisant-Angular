import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  /**
   * loading all initial datas from olympic.json to Olympic interface array
   * @returns BehaviorSubject<Olympic[]> : Olympic interface array
   */
  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error(error);
        this.olympics$.next([]);
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
  /**
   * Get Olympic infos by country's id
   * @param id country's id to get
   * @returns Olympic
   */
  getOlympicById(id: number): Observable<Olympic | undefined> {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) =>
        olympics.find((olympic: Olympic) => olympic.id === id)
      )
    );
  }
  /**
   * Get Olympic infos by country's name
   * @param id country's name to get
   * @returns Olympic
   */
  getOlympicIdByName(name: string): Observable<Olympic | undefined> {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) =>
        olympics.find((olympic: Olympic) => olympic.country === name)
      )
    );
  }
  /**
   * Get Olympic medals total by country's id
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
  /**
   * Get Olympic athletes total by country's id
   * @param id country's id
   * @returns country's total athletes for all olympics games
   */
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
  /**
   * Get Olympic participation total by country's id
   * @param id country's id
   * @returns country's total athletes for all olympics games
   */
  getParticipationsById(id: number): Observable<Participation[] | undefined> {
    return this.getOlympicById(id).pipe(
      map((olympic) => olympic?.participations)
    );
  }
  /**
   * Get All Olympic participation total by all countries
   * @returns country's total participations for all countries at the olympics games
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
   * Get an object PieData for the pie with countries name and medals total
   * @returns Observable<PieData[]>
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

  /**
   * Get an object LineData for the line graph with country name, participation's year and participation's medals
   * @returns Observable<LineData[]>
   */
  getLineDataById(id: number): Observable<LineData[]> {
    return this.getOlympicById(id).pipe(
      map((olympic) => [
        {
          name: olympic?.country || '',
          series: (olympic?.participations || []).map((participation) => ({
            name: participation.year.toString(),
            value: participation.medalsCount,
          })),
        },
      ])
    );
  }
}
