import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
/* La classe OlympicService permet de récupérer les données 
* et de les partager entre les différents components.
*/

private olympicUrl = './assets/mock/olympic.json';
private olympics$ = new BehaviorSubject<Olympic[]>([]);
id!: number;

  constructor(private http: HttpClient) {}

  // Initialisation des données lors du lancement de l'application
    loadInitialData() {
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

  // Récupère la liste Olympics
  getOlympics() {
    return this.olympics$.asObservable();
  }

  /* Récupère la liste Olympics par l'id.
  * param id - Olympic
  */
  getOlympicsById(id: number): Observable<Olympic[]> {
    return this.olympics$
      .asObservable()
      .pipe(
        map((olympics: Olympic[]) =>
          olympics.filter((o: Olympic) => o.id === id)
        )
      );
  }
}
