import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,throwError} from 'rxjs';
import { catchError, tap, retry} from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { HttpErrorResponse } from '@angular/common/http';

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
        console.error(error);
        return caught;
      })
    );
  }

  // method to get data as observable
  getOlympics() {
    return this.olympics$.asObservable().pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      }
      // Return an observable with a user-facing error message.
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }

  }

  // getOlympicByCountry(name: string): Observable<Olympic | undefined> {
  //   return this.olympics$.asObservable().pipe(
  //     map((olympics) => olympics.find((olympic) => olympic.country === name)),
  //     retry(3), // retry a failed request up to 3 times
  //     catchError(this.handleError)
  //   )
  // }
