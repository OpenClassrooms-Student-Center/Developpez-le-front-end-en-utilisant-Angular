import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { BehaviorSubject, last, Observable, map, catchError } from 'rxjs';
import { Olympic } from '../models/Olympic';
import { MyErrorHandlerService } from './handle-error.service';

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
    this.olympics$ = this.http.get<Olympic[]>(this.olympicUrl).pipe(
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

  getOlympicByName(name: string): Observable<Olympic | undefined> {
    return this.getOlympics().pipe(map(olympics => olympics.find(olympic => olympic.country == name)));
  }

}
