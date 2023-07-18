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
et de les partager entre les différents components.
Le BehaviorSubject permet de recevoir les valeurs précédents et les nouvelles valeurs.
*/

private olympicUrl = './assets/mock/olympic.json';
private olympics$ = new BehaviorSubject<Olympic[]>([]);
id!: number;

  constructor(private http: HttpClient) {}

  /* Cette fonction initialise les données lorque l'application est lancée, 
  elle est déclarée dans le AppComponent. Elle récupère les données via le httpClient.
  Si une erreur existe, une alerte est déclarée et l'erreur apparaît dans le console.log
  */
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

  // Cette fonction permet de récupérer une liste de données de type Olympic déclarée en propriété, retournée en observable
  getOlympics() {
    return this.olympics$.asObservable();
  }

  /* Cette fonction permet de récupérer une liste de données de type Olympic au travers d'un identifiant retournée en observable.
  Le pipe permet d'appliquer des transformations sur nos données, le map permet de créer un nouvel Observable à partir de l'Observable Olympic []
  le filter conservera que les données à garder qui sont les id.
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
