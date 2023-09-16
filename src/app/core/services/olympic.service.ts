import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Olympic} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>([]);


  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value);
      }),
      catchError((error, caught) => {
        console.error(error);
        this.olympics$.error(error);
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable()
  }
}
