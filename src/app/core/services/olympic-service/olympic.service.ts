import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, defaultIfEmpty, delay, map, tap } from 'rxjs/operators';
import { Country, OlympicData } from '@core/models/olympic-data.types';
import ApiService from '../api-service/api-service.service'; // Assuming you have the correct import path
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OlympicService extends ApiService {
  private olympics$ = new BehaviorSubject<OlympicData>([]);
  private isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(httpClient: HttpClient) {
    super(httpClient); // Pass the HttpClient instance to the base class

    this.baseUrl = './assets/mock/olympic.json';
  }

  loadInitialData(): Observable<OlympicData> {
    this.isLoading$.next(true);

    const fetchedObservable: Observable<OlympicData> =
      this.fetchGet<OlympicData>({
        urlSegment: this.baseUrl,
      });

    return fetchedObservable.pipe(
      delay(1_500),
      tap((value) => {
        this.isLoading$.next(false);
        return this.olympics$.next(value);
      }),
      catchError((error: string, caught: Observable<OlympicData>): never => {
        this.isLoading$.next(false);
        this.olympics$.next([]);
        throw new Error(
          `An error occurred while loading Olympic data: ${caught}`
        );
      })
    );
  }

  getOlympics(): Observable<OlympicData> {
    return this.olympics$.asObservable();
  }

  getOlympicCountryById(id: number): Observable<Country | null | undefined> {
    return this.olympics$.pipe(
      map((olympics) =>
        olympics.find((country: Country) => {
          return country.id === id;
        })
      ),
      defaultIfEmpty(null)
    );
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }
}
