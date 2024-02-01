import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympics } from '../models/Olympic';
import { CustomErrorHandler } from '../../shared/error-handler.service'; 

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';

  constructor(private http: HttpClient, private errorHandler: CustomErrorHandler) {}

  getOlympics() {
    return this.http.get<Olympics[]>(this.olympicUrl).pipe(
      tap(data=>console.log(data)),
      catchError(this.errorHandler.handleError) 
    );
  }

  getCountryById(countryId: number): Observable<Olympics | null> {
    return this.http.get<Olympics[]>(this.olympicUrl).pipe(
      map(countries => countries.find(country => country.id === countryId) || null),
      catchError(this.errorHandler.handleError) 
    );
  }

  isIdExist(countryId: number): Observable<Olympics | null> {
    return this.http.get<Olympics[]>(this.olympicUrl).pipe(
      map(countries => {
        const country = countries.find(country => country.id === +countryId);
        return Boolean(country); // Convertit le pays en valeur booléenne
      }),
      catchError(this.errorHandler.handleError) 
    )
    
  }

}
