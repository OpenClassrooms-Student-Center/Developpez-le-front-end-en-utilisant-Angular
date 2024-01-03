import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, retry, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Olympic} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {
  }

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      // limit httpRequest retry to 3
      retry(3),
      catchError((error: HttpErrorResponse) => {
        //console.error(error);
        return throwError(() => error);
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable().pipe(
      // limit httpRequest retry to 3
      retry(3),
      catchError((error: HttpErrorResponse) => {
        //console.error(error);
        return throwError(() => error);
      }));
  }
}
