import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, map, Observable} from "rxjs";
import {Olympic, Olympics} from "@models/Olympic";
import {Id} from "@models/id";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private _http = inject(HttpClient);
  private _olympicUrl = './assets/mock/olympic.json';

  /**
   * Get the list of Olympics
   * @memberof OlympicService
   * This method fetches the list of Olympics from the server.
   *
   * @returns {Observable<Olympics>} The observable olympics$ returns an array of objects, where each object has the following properties:
   * - id: The ID of the country.
   * - country: The name of the country.
   * - participations: An array of objects, where each object has the following properties:
   *  * - id: The ID of the Olympic event.
   * - year: The year of the Olympic event.
   * - city: The city of the Olympic event.
   * - medalsCount: The number of medals won by the country in the Olympic event.
   * - athleteCount: The number of athletes representing the country in the Olympic event.
   *
   * Finally, the method catches any errors and logs them to the console.
   * And returns an empty array if there are no Olympics.
   */
  public getOlympics$(): Observable<Olympics> {
    return this._http.get<Olympics>(this._olympicUrl).pipe(
      catchError((error) => {
        console.error('Error fetching olympics', error);
        return EMPTY;
      })
    );
  }

  /**
   * Get the details of an Olympic event
   * @memberof OlympicService
   * @param {Id} id The ID of the Olympic event.
   *
   * This method fetches the details of an Olympic event from the server.
   *
   * @returns {Observable<Olympic | undefined>} The observable olympic$ returns an object with the following properties:
   * - id: The ID of the country.
   * - country: The name of the country.
   * - participations: An array of objects, where each object has the following properties:
   * * - id: The ID of the Olympic event.
   * - year: The year of the Olympic event.
   * - city: The city of the Olympic event.
   * - medalsCount: The number of medals won by the country in the Olympic event.
   * - athleteCount: The number of athletes representing the country in the Olympic event.
   *
   * And returns undefined if the Olympic event is not found.
   *
   * Finally, the method catches any errors and logs them to the console.
   */
  public getOlympic$(id: Id): Observable<Olympic | undefined> {
    return this._http.get<Olympics>(this._olympicUrl).pipe(
      map((olympics) => olympics.find((olympic) => olympic.id === id)),
      catchError((error) => {
        console.error('Error fetching olympic', error);
        return EMPTY;
      })
    );
  }
}
