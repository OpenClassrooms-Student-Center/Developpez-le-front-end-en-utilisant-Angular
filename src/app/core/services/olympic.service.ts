import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from 'src/app/core/models/olympic';
import { of, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl: string = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Country[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error(error);
        Error('An error occurred')
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics(): Observable<Array<Country>> {
    return this.olympics$.asObservable();
  }
}