import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getMedalsPerCountry() {
    let medalsPerCountry: { country: string; medalsCount: number }[] = [];

    this.olympics$.subscribe((olympics) => {
      olympics.forEach((olympic) => {
        medalsPerCountry.push({
          country: olympic.country ? olympic.country : '',
          medalsCount: olympic.participations
            ? olympic.participations.reduce((total, participation) => {
                return total + participation.medalsCount;
              }, 0)
            : 0,
        });
      });
    });

    return medalsPerCountry;
  }

  getCountries() {
    let countries: string[] = [];
    this.olympics$.subscribe((olympics) => {
      olympics.forEach((olympic) => {
        if (olympic.country) {
          countries.push(olympic.country);
        }
      });
    });

    return countries;
  }

  getMedals() {
    let medals: number[] = [];

    this.olympics$.subscribe((olympics) => {
      olympics.forEach((olympic) => {
        if (olympic.participations) {
          let count = 0;
          olympic.participations.forEach((participation) => {
            if (participation.medalsCount) {
              count += participation.medalsCount;
            }
          });
          medals.push(count);
        }
      });
    });

    return medals;
  }
}
