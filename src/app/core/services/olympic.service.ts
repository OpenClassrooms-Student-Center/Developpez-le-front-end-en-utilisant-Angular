import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);
  // private olympics$ = new BehaviorSubject<any>(undefined);
  private olympicObjet = <any>Olympic; // je ne sais pas ce que j'ai fat ici

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling = gestion des erreurs avec une méthode bas niveau
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        // declarer un objet de type olympic
        // this.olympics$.next(this.olympicObjet); // je ne sais pas ce que j'ai fat ici
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getOlympicById(id: number): Observable<Olympic> {
    const olympic = this.olympics$.value.find((o) => o.id === id);
    if (olympic) {
      return of(olympic);
    }
    return throwError(() => new Error(`Olympic with id ${id} not found`));
  }
}





// export class OlympicService {

//   private loading = false;
//   private olympic$ = Observable<Olympic>;

//   constructor(private http: HttpClient) {}

//   loadInitialData() {
//     this.loading = true;
//     return this.http.get<any>(this.olympicUrl).pipe(
//       tap((value) => {
//         this.olympics$.next(value);
//         this.endLoadingState();
//       }),
//       catchError((error, caught) => {
//         console.error("Une erreur s'est produite lors du chargement des données olympiques :", error);
//         // this.olympics$.next(value);
//         this.endLoadingState();
//         return caught;
//       })
//     );
//   }

//   private endLoadingState() {
//     this.loading = false;
//   }
