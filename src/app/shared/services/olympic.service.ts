import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";
import {Olympics} from "@models/Olympic";

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
        return [];
      })
    );
  }
}
