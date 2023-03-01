import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  private olympicUrl = './assets/mock/olympic.json';

  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  /**
   * Load initial data from server
   * @returns {Observable<Olympic[]>}
   */
  public loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((this.handleError<Olympic[]>('loadInitialData', [])))
    );
  }

  /** Return all countries */
  public getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  /** Return country data from countryId number */
  public getOlympicByCountryId(countryId: number): Observable<Olympic> {

      const countryData = this.olympics$.pipe(
        map(olympics => (olympics.find(
              olympic => olympic.id === countryId))
            )
        ) as Observable<Olympic>;

      if (!countryData) {
        throw new Error('Country data not found!');
      } else {
        return countryData;
    }
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error); // log to console
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


}
