import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ICountry, Olympics } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympics>(undefined);

  constructor(private http: HttpClient) {}

  /**
   * Charge les données du fichier JSON
   * @returns {Observable<Olympics>}
   */
  loadInitialData(): Observable<Olympics> {
    return this.http.get<Olympics>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  /**
   * Récupère les données d'un pays ayant participé aux JO
   * @param {string} countryId L'identifiant du pays a récupérer
   * @returns {Observable<ICountry|undefined>}
   */
  getCountryById(countryId: string): Observable<ICountry | undefined> {
    return this.getOlympics().pipe(
      map(olympics => olympics ? olympics.find(country => country.id === +countryId) : undefined)
    );
  }

  /**
   * Récupère l'intégralité des données des pays ayant participés aux JO
   * @returns {Observable<Olympics>}
   */
  getOlympics(): Observable<Olympics> {
    return this.olympics$.asObservable();
  }
}
