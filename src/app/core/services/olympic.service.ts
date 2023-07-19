import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

/**
 * The OlympicService class retrieves data
 * and share them between components.
 */
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}
  /**
   * Return loading data from Olympic
   *
   * @returns The data inside olympic.json's file
   */
  public loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      map((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        alert('An occured error');
        console.error(error);
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  /**
   * Return list of Olympics
   *
   * @returns An Observable about Olympic
   */
  public getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  /**
   * Return list of Olympics by Id
   *
   * @param id
   *
   * @returns An Observable about Olympic filtered by ib
   */
  public getOlympicsById(id: number): Observable<Olympic[]> {
    return this.olympics$
      .asObservable()
      .pipe(
        map((olympics: Olympic[]) =>
          olympics.filter((o: Olympic) => o.id === id)
        )
      );
  }
}
