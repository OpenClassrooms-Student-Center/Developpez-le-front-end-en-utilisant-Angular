import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, retry, Subject, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Olympic} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympics.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      retry(3),
      catchError((error : HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  getOlympics() : Observable<Olympic[]> {
    return this.olympics$.asObservable().pipe(
      retry(3),
      catchError((error : HttpErrorResponse) => {
      console.error(error);
      return throwError(() => error);
    }));
  }
}
