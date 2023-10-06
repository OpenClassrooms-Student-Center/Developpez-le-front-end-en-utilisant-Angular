import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ParticipationService {
  private participationUrl = './assets/mock/olympic.json';
  private participations$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.participationUrl).pipe(
      tap((value) => this.participations$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.participations$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.participations$.asObservable();
  }
}
