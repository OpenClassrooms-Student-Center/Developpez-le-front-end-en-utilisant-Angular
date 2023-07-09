import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$: BehaviorSubject<Olympic[]> = new BehaviorSubject<Olympic[]>([]);
  public errors: string[] = [];
  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        this.errors.push(error);
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics$() : Observable<Olympic[]> {
    return this.olympics$.asObservable(); 
  }
  
  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable().pipe(delay(500))
    
  }

}
