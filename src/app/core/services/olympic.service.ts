import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Participation } from '../models/Participation';

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
  getMedalsById(id: number): number {
    let medalsByCountry = 0;
    /*    this.olympics$.pipe(
      map((olympics: Olympic[]) =>
        olympics[id].participations.forEach(
          (participation: Participation) =>
            (counterByCountry += participation.medalsCount)
        )
      )
    );*/
    this.getOlympicById(id).subscribe((olympic) => {
      if (olympic)
        olympic.participations.forEach(
          (participation: Participation) =>
            (medalsByCountry += participation.medalsCount)
        );
    });
    return medalsByCountry;
  }
  getAthletesById(id: number): number {
    let athletesByCountry = 0;

    this.getOlympicById(id).subscribe((olympic) => {
      if (olympic)
        olympic.participations.forEach(
          (participation: Participation) =>
            (athletesByCountry += participation.athleteCount)
        );
    });
    return athletesByCountry;
  }

  getListOfOlympicGamesById(id: number): number[] {
    let olympicsListByCountry!: number[];

    this.getOlympicById(id).subscribe((olympic) => {
      if (olympic)
        olympic.participations.forEach((participation: Participation) =>
          olympicsListByCountry.push(participation.year)
        );
    });
    return olympicsListByCountry;
  }

  getNumberOfCountries(): number {
    return 0;
  }
  getListOfOlympicGames(): string[] {
    let olympicsList = ['2012', '2016', '2020'];
    return olympicsList;
  }
  getNumberOfOlympicGames(): number {
    return this.getListOfOlympicGames().length;
  }
}
