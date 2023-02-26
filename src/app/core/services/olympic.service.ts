import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error('Loading data service error.' + error);
        return caught;
      })
    );
  }

  // Return all countries
  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  // Return country data from countryId number
 getOlympicByCountryId(countryId: number): Observable<Olympic> {

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


}
