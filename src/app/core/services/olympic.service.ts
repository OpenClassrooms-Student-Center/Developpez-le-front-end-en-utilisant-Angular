import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError, pipe, switchMap} from 'rxjs';
import { catchError, tap, map, filter } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);
  // for searching by id
  public dataParticipation: {"name": string, "value": number}[]  = [];
  public olympicData!: {"name": string, "series": {"name": string, "value": number}[]};




  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error(error);
        return caught;
      })
    );
  }
  getOlympics() {
    return this.olympics$.asObservable();
  }

  getDataPieChart(): Observable<{ "name": string; "value": number; }[]> {
    return this.olympics$.asObservable().pipe(
      switchMap((olympics) => {
        const updatedOlympics = olympics.map((olympic: Olympic) => {
          const medalsCount = olympic.participations.reduce((totalMedals, participation) => totalMedals + participation.medalsCount, 0);
          return { "name": olympic.country, "value": medalsCount };
        });
        return of(updatedOlympics);
      })
    );
  }
  // getOlympicById(id: number): Observable<Olympic | undefined> {
  //   return this.getOlympics().pipe(
  //     map((olympics: Olympic[]) => olympics.find((olympic) => olympic.id === id))
  //   );
  // }

  getOlympicById(id: number): Observable<{"name": string, "series": {"name": string, "value": number}[]}> {
    const olympic = this.olympics$.value.find((olympic) => olympic.id === id);
      if (!olympic) {
        return throwError(() => new Error(`Olympic with id ${id} not found
          + verification recherche by id: ${this.olympics$.value.find((olympic) => olympic.id === id)}`));

      } else {
        this.dataParticipation = []; // Reset dataParticipation array

        olympic.participations.forEach((participation) => {
          this.dataParticipation.push({
            "name": participation.year.toString(),
            "value": participation.medalsCount,
          });
        });

        this.olympicData = {
          "name": olympic.country,
          "series": this.dataParticipation
        };

        return of(this.olympicData);
      }
    }



  getNumberOfJo(): Observable<number> {
    return this.olympics$.pipe(
      map((olympics) => {
        const numberJos =  olympics.reduce((total, olympic) => total + olympic.participations.length, 0);
        return numberJos;
      }),
      catchError((error) => {
        console.error(error);
        return of(0);
      })
    );
  }

  getNumberOfCountry(): Observable<number> {
    return this.olympics$.pipe(
      map((olympics) => {
        const countries: string[] = olympics.reduce((acc: string[], olympic) => {
          if (!acc.includes(olympic.country)) {
            acc.push(olympic.country);
          }
          return acc;
        }, []);
        return countries.length;
      }),
      catchError((error) => {
        console.error(error);
        return of(0);
      })
    );
  }

}
