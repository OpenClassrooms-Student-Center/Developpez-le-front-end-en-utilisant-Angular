import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
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
    return this.olympics$ = this.http.get<Olympic[]>(this.olympicUrl);
  }

  getOlympics(): Observable<Olympic[]> {
    return this.loadInitialData();
  }

  getOlympicByName(name: string): Observable<Olympic | undefined> {
    return this.getOlympics().pipe(map(olympics => olympics.find(olympic => olympic.country == name)));
  }

}
