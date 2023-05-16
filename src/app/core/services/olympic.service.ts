import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError, pipe, switchMap} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Series } from 'd3-shape';

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

  getOlympics(): Observable<{ name: string; value: number; }[]> {
    return this.olympics$.asObservable().pipe(
      switchMap((olympics) => {
        const updatedOlympics = olympics.map((olympic: Olympic) => {
          const medalsCount = olympic.participations.reduce((totalMedals, participation) => totalMedals + participation.medalsCount, 0);
          return { name: olympic.country, value: medalsCount };
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



  // getOlympicById(id: number): Observable<Olympic> {
  //   return this.olympics$.asObservable().pipe(
  //     map(this.olympics$.value.find((o) => o.id === id) )
  //   )
  //   const olympic =
  //   if (olympic) {
  //     return of(olympic);
  //   }
  //   return throwError(() => new Error(`Olympic with id ${id} not found`));
  //   }

}



  //   const olympic = this.olympics$.value.find((o) => o.id === id);
  //   if (olympic) {
  //     return of(olympic);
  //   }
  //   return throwError(() => new Error(`Olympic with id ${id} not found`));
  // }




  // (participationData: Array<{value: number, name: number}>) => {
  //       value: participationData[0].medalsCount,
  //       name: participationData[0].year
  //     }
