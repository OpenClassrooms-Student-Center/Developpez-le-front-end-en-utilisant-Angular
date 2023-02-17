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
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  // Return all countries
  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  // Return country data from countryId number
 getOlympicCountry(countryId: number): Observable<Olympic | undefined> {
    const countryData = this.olympics$.pipe(
      map(olympics => olympics.find(
          olympic => olympic.id === countryId)
        )
      );
    return countryData;


  }


}
