import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface Olympic {
  // Définissez les propriétés de l'interface Olympic en fonction des données à récupérer
  // Exemple :
  id: number;
  name: string;
  year: number;
  hostCity: string;
}

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]); // BehaviorSubject contenant un tableau d'objets Olympic

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[]> { // Renvoie un Observable qui émet un tableau d'objets Olympic
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error(error);
        this.olympics$.next([]); // En cas d'erreur, émet un tableau vide pour signaler un problème
        return caught;
      })
    );
  }

  getOlympics(): Observable<Olympic[]> { // Renvoie un Observable représentant la valeur courante du BehaviorSubject
    return this.olympics$.asObservable();
  }
}
