import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);
  router: any;

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Array<Olympic>>  {
    return this.http.get<Array<Olympic>>(this.olympicUrl).pipe(
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

  getOlympics(): Observable<Array<Olympic>> {
    return this.olympics$.asObservable();
  }

  /**
   * We count the number of medals and return the value
  */
  countMedals(olympic:Olympic):number {
    let medals: number = 0;

    for (let participation of olympic.participations) {
      medals += participation.medalsCount;
    }
    return medals;
  }  

  /**
   * We count the total games the country were in and return the value
  */
  countUniqueGames(olympic:Olympic):number {
    let totalGames: number = 0;

    for (let participation of olympic.participations) {
      totalGames = participation.id;
    }

    return totalGames;
  }
}
