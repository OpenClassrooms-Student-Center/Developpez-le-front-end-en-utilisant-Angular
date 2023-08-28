import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap, take, filter } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';
import { Participation } from '../models/Participation';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  loadInitialData() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return throwError(() =>  this.errorService.setMessageError())
       // return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getDataOlympicsCountry(country : string): Observable<Participation[]> {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      take(1),
      map((tabOlympicCountry) => tabOlympicCountry.filter(olympicCountry => olympicCountry.country === country)),
      map(tabOlympicCountry => tabOlympicCountry[0].participations),
      catchError((error) => {
        return throwError(() =>  error.message)
      }))
  }

  getNumberOfJO(tabOlympicCountry : OlympicCountry[]): number {
    let tabYearsOlympic : number[] = [];
    tabOlympicCountry.forEach(country => country.participations.forEach(participation => {
      if (!tabYearsOlympic.includes(participation.year))
        tabYearsOlympic.push(participation.year)
    }))
    return tabYearsOlympic.length;
  }
}
