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
  constructor(private http: HttpClient) { }

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // push errors to errors array
        this.errors.push(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  /**
   * Get olympics data as observable
   * @returns Observable of Olympic array
   */
  getOlympics$(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  /**
   * Get olympics data of observable with a delay of 0.5s
   * @returns Observable of Olympic array
   */
  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable().pipe(delay(500))
  }

  /**
   * Get a country data by its id
   * @param id the id of the country
   * @returns 
   */
  getCountry(id: number): Observable<Olympic | undefined> {
    return this.olympics$.asObservable().pipe(map((countries) => {
        return countries.find(country => country.id == id);
    }))
  }

    /**
   * Check if the country exists
   * @param id the id of the country
   * @returns Observable<Olympic | "not_found" | undefined>
   */
    checkCountry(id:number) : Observable<Olympic | "not_found" | undefined> {
      return this.olympics$.asObservable().pipe(map((countries) => {
        if(countries.length>0)
          return countries.find((country) => country.id==id) || "not_found";
        return undefined;
      }))
    }

  /**
   * Get errors from loadInitialData method
   * @returns Array of string
   */
  getErrors(): string[] {
    return this.errors;
  }

}
