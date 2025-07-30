import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Olympic } from '../Models/Olympic';
import { Participation } from '../Models/Participation';
import { Router } from '@angular/router';




/**
 * OlympicService provides methods to interact with Olympic data.
 * It fetches Olympic data from a JSON file, calculates total medals and athletes,
 * and allows navigation back to the home page.
 */
@Injectable({ providedIn: 'root' })
export class OlympicService {


  
  private olympicDataUrl = 'assets/mock/olympic.json';
  private olympicsSubject = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient,
    private router: Router
  ) { }

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicDataUrl)
      .pipe(
        tap(data => this.olympicsSubject.next(data)),
        catchError((error) => {
          this.olympicsSubject.next([]);
          return throwError(() => new Error(`Error loading olympics data: ${error.message}`));
        })
      );

  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympicsSubject.asObservable();
  }
  
  /**
   * Calculates the total sum of a specified property ('medalsCount' or 'athleteCount') 
   * across an array of Participation objects.
   */
  totalMedalCalc(participations: Participation[], count: 'medalsCount' | 'athleteCount'): number {

    return participations.reduce((total, participation) => total + Number(participation[count]), 0);
  }

  backToHome() {
    this.router.navigate(['/']);
  }

}


