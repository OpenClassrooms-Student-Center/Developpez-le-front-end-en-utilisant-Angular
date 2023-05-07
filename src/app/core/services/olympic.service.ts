import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);
  // private olympics$ = new BehaviorSubject<any>(undefined);
  private olympicObjet = <any>Olympic; // je ne sais pas ce que j'ai fat ici

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling = gestion des erreurs avec une méthode bas niveau
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        // declarer un objet de type olympic
        this.olympics$.next(this.olympicObjet); // je ne sais pas ce que j'ai fat ici
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable(); // BehaviorSubject(=observateur) que l'on tranforme en observable
  }


}
