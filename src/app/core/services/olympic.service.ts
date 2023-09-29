import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DtrOlympic, Olympic, Olympics } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympics>(undefined);
  private olympic$ = new BehaviorSubject<DtrOlympic>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympics>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        this.olympics$.error(error);
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() : Observable<Olympics> {
    return this.olympics$.asObservable();
  }

  getOlympic(id : number) : Observable<DtrOlympic> {
    this.olympics$.asObservable().subscribe({
      next:(olympics) => {
        this.olympic$.next(olympics?.find((dtrOlympic) => dtrOlympic?.id == id));
      }
    }).unsubscribe();
    return this.olympic$.asObservable();
  }

  getNumberOfCountry(olympics : Olympics) {
    throw new Error("Not Implemented");
  }

  getNumberOfJOs(olympics : Olympics) {
    throw new Error("Not Implemented");
  }
}
