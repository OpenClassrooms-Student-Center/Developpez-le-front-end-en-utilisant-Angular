import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$: Observable<Olympic[]> | undefined;

  constructor(private http: HttpClient) { }

  loadInitialData(): Observable<Olympic[]> {
    //si deja chargé
    if (!!this.olympics$) { return this.olympics$; }
    //sinon on va lire le fichier json
    this.olympics$ = this.http.get<any>(this.olympicUrl).pipe(
      catchError((error, caught) => {
        console.error(error);
        return caught;
      })
    );
    return this.olympics$;
  }

  getOlympics(): Observable<Olympic[]> {
    return this.loadInitialData();
  }

 // getOlympicByName(name: String) : Observable<Olympic> {
 //   return null;
 // }
}
