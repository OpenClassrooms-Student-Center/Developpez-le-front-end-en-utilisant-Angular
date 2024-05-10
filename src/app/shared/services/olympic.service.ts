import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, map, Observable} from "rxjs";
import {Olympic, Olympics} from "@models/Olympic";
import {Id} from "@models/id";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
 private _http = inject(HttpClient);
  private _olympicUrl = './assets/mock/olympic.json';

  public getOlympics$(): Observable<Olympics> {
    return this._http.get<Olympics>(this._olympicUrl).pipe(
      catchError((error) => {
        console.error('Error fetching olympics', error);
        return EMPTY;
      })
    );
  }

  public getOlympic$(id: Id): Observable<Olympic | undefined> {
    return this._http.get<Olympics>(this._olympicUrl).pipe(
      map((olympics) => olympics.find((olympic) => olympic.id === id)),
      catchError((error) => {
        console.error('Error fetching olympic', error);
        return EMPTY;
      })
    );
  }
}
