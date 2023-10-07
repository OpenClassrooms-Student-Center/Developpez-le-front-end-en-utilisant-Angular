import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicData } from '@core/interfaces/olympic-data.interface';
import ApiService from '../api-service/api-service.service'; // Assuming you have the correct import path
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
class OlympicService extends ApiService {
  private olympics$ = new BehaviorSubject<OlympicData | null>(null);

  constructor(httpClient: HttpClient) {
    super(httpClient); // Pass the HttpClient instance to the base class
  }

  // Change this method to use the inherited API service
  loadInitialData() {
    this.baseUrl = './assets/mock/olympic.json';
    return this.fetchGet<OlympicData>({ urlSegment: this.baseUrl }).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        throw new Error(
          `An error occurred while loading Olympic data: ${caught}`
        );
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
}

export default OlympicService;
