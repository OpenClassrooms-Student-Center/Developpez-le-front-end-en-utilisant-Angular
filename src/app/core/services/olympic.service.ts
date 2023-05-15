import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError, pipe, switchMap} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);
  public olympic!: Olympic;

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


  getOlympics(): Observable<{ country: string; medalsCount: number; }[]> {
    return this.olympics$.asObservable().pipe(
      switchMap((olympics: Olympic[]) => {
        const updatedOlympics = olympics.map((olympic: Olympic) => {
          const medalsCount = olympic.participations.reduce((total, participation) => total + participation.medalsCount, 0);
          return { country: olympic.country, medalsCount };
        });
        return of(updatedOlympics);
      })
    );
  }






  getOlympicById(id: number): Observable<Olympic> {
    const olympic = this.olympics$.value.find((o) => o.id === id);
    if (olympic) {
      return of(olympic);
    }
    return throwError(() => new Error(`Olympic with id ${id} not found`));
  }
}
