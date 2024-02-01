import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympics } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic2.json';

  constructor(private http: HttpClient) {}

  getOlympics() {
    return this.http.get<Olympics[]>(this.olympicUrl).pipe(
      tap(data=>console.log(data)),
      catchError(this.handleError) 
    );
  }

  getCountryById(countryId: number): Observable<Olympics | null> {
    return this.http.get<Olympics[]>(this.olympicUrl).pipe(
      map(countries => countries.find(country => country.id === countryId) || null),
      catchError(this.handleError) 
    );
  }

  isIdExist(countryId: number): Observable<Olympics | null> {
    return this.http.get<Olympics[]>(this.olympicUrl).pipe(
      map(countries => {
        const country = countries.find(country => country.id === +countryId);
        return Boolean(country); // Convertit le pays en valeur booléenne
      }),
      catchError(this.handleError) 
    )
    
  }

  // class implement ErrorHandler interface  a part 
  private handleError(error: HttpErrorResponse): Observable<any> {
    const err = 'Une erreur s\'est produite pendant l\'accès aux données. Veuillez réessayer plus tard.';
    return throwError(() => err)
  }

}
