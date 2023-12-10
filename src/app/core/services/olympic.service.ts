import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../models/Olympic';

/**
 * Service to manage Olympic data.
 * Provides functionality to load and retrieve Olympic country participation data.
 */
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Country[]>([]);

  /**
   * Constructs the OlympicService.
   * @param http HttpClient used for making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Loads initial Olympic data from a JSON file.
   * Upon successful retrieval, updates the observable with the new data.
   * In case of an error, logs the error and sets the observable to an empty array.
   * @returns An observable of the HTTP request.
   */
  loadInitialData() {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((countries) => this.olympics$.next(countries)),
      catchError((error, caught) => {
        console.error(error);
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  /**
   * Returns an observable of the current Olympic data.
   * @returns An observable of Country array.
   */
  getOlympics() {
    return this.olympics$.asObservable();
  }
}
