import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, EMPTY, map, Observable, tap} from "rxjs";
import {Olympic, Olympics} from "@models/Olympic";
import {Id} from "@models/id";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
 private _http = inject(HttpClient);
  private olympicUrl = './assets/mock/olympic.json';

  private _olympics$ = new BehaviorSubject<Olympics>([]);

  public getOlympics$(): Observable<Olympics> {
    return this._http.get<Olympics>(this.olympicUrl).pipe(
      tap((olympics) => this._olympics$.next(olympics)),
      catchError((error) => {
        console.error('Error fetching olympics', error);
        return EMPTY;
      })
    );
  }

  public getOlympic$(id: Id): Observable<Olympic | undefined> {
    return this._http.get<Olympics>(this.olympicUrl).pipe(
      map((olympics) => {
         return olympics.find((olympic) => olympic.id === id);
      }),
      catchError((error) => {
        console.error('Error fetching olympic', error);
        return EMPTY;
      })
    );
  }
}
