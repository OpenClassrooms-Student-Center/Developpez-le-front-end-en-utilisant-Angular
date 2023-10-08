import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { OlympicData } from '@core/models/olympic-data.types';
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
  }

  // Change this method to use the inherited API service
  loadInitialData(): Observable<OlympicData> {
    this.baseUrl = './assets/mock/olympic.json';

    // Set isLoading to true when you start loading data
    this.isLoading$.next(true);

    const fetchedObservable: Observable<OlympicData> =
      this.fetchGet<OlympicData>({
        urlSegment: this.baseUrl,
      });

    return fetchedObservable.pipe(
      // delay(2_000),
      tap((value) => {
        // Use tap to update isLoading when data arrives
        this.isLoading$.next(false);
        return this.olympics$.next(value);
      }),
      catchError((error: string, caught: Observable<OlympicData>): never => {
        // can be useful to end loading state and let the user know something went wrong
        this.isLoading$.next(false);
        this.olympics$.next([]);
        throw new Error(
          `An error occurred while loading Olympic data: ${caught}`
        );
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }
}
