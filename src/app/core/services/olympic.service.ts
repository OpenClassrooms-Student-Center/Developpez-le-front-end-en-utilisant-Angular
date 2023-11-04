import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Participation } from '../models/Participation';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient, private router: Router) { }

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        this.router.navigateByUrl(`notfound`);

        throw Error("Data loading error");
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  getOlympicById(id: number, olympics: Olympic[]): Olympic | undefined {
    var olympic = undefined;
    if (olympics) {
      olympic = olympics.find(o => o.id == id);
    }
    return olympic;
  }

  getOlympicByCountry(country: string, olympics: Olympic[]): Olympic | undefined {
    var olympic = undefined;
    if (olympics) {
      olympic = olympics.find(o => o.country == country);
    }
    return olympic;
  }

  getParticipationById(id: number, participations: Participation[]): Participation | undefined {
    var participation = undefined;
    if (participations) {
      participation = participations.find(p => p.id == id);
    }
    return participation;
  }

  getMedalsCountByOlympicId(id: number, olympics: Olympic[]): number {
    var medalsCount = 0;
    var country = this.getOlympicById(id, olympics);
    if (country) {
      country.participations.forEach(p => medalsCount += p.medalsCount);
    }
    return medalsCount;
  }

  getNumberOfJos(olympics: Olympic[]): number {
    var jos: Participation[] = [];
    olympics.forEach(o => o.participations.forEach(p => {
      var participation = this.getParticipationById(p.id, jos);
      if (!participation) {
        jos.push(p);
      }
    }));
    return jos.length;
  }

  getNumberOfCountries(olympics: Olympic[]): number {
    var olympicList: Olympic[] = [];
    olympics.forEach(ol => {
      var olympic = this.getOlympicById(ol.id, olympicList);
      if (!olympic) {
        olympicList.push(ol);
      }
    });
    return olympicList.length;
  }

  getNumberOfEntriesByOlympicId(id: number, olympics: Olympic[]): number {
    var country = this.getOlympicById(id, olympics);
    return country ? country.participations.length : 0;
  }

  getNumberOfAthletesByOlympicId(id: number, olympics: Olympic[]): number {
    var numberOfAthletes = 0;
    var country = this.getOlympicById(id, olympics);
    if (country) {
      country.participations.forEach(p => numberOfAthletes += p.athleteCount);
    }
    return numberOfAthletes;
  }
}
