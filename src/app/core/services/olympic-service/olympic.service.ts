import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicData } from '@core/models/olympic-data.interface';
import ApiService from '../api-service/api-service.service'; // Assuming you have the correct import path
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
class OlympicService extends ApiService {
  private olympics$ = new BehaviorSubject<OlympicData>([]);

  constructor(httpClient: HttpClient) {
    super(httpClient); // Pass the HttpClient instance to the base class
  }

  // Change this method to use the inherited API service
  loadInitialData(): Observable<OlympicData> {
    this.baseUrl = './assets/mock/olympic.json';

    const fetchedObservable: Observable<OlympicData> =
      this.fetchGet<OlympicData>({
        urlSegment: this.baseUrl,
      });

    return fetchedObservable.pipe(
      tap((value) => {
        return this.olympics$.next(value);
      }),
      catchError((error: string, caught: Observable<OlympicData>): never => {
        // TODO: improve error handling
        console.warn(error, caught);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        throw new Error(
          `An error occurred while loading Olympic data: ${caught}`
        );
      })
    );
  }

  getOlympics() {
    return this.olympics$;
  }
}

export default OlympicService;
