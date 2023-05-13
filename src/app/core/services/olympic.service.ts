import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

/**
 * Provided in starter.
 * Service resposible for retrieving the data.
 */
@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  /**
   * Here, the dataset is a static json file.
   * But changing the url to an API that returns the same JSON objects guarranty that this application will still works.
   */
  private olympicUrl:string = './assets/mock/olympic.json';
  private olympics$:BehaviorSubject<Olympic[]> = new BehaviorSubject<Olympic[]>([]);
  private _errors:string[] = [];

  constructor(private http: HttpClient) {}

  public loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        /**
         * Error handling has been improved from the starter version by creating an error messages Array.
         * Every time there is an error, the message is pushed to the Array and the getErrorMessages() function below,
         * allow the different components to retrieve all error messages and display them accordingly.
         */
        this._errors.push(error.errorMessage);
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  /**
   * The original function to get static data.
   * @returns an Obsrvable with an Array of Olympic model.
   */
  public getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  /**
   * This function is usefull to simulate an asynchronous call to an API to get the data.
   * The idea is to force me to manage the delay between the call and the result
   * in this case, by adding a mat progress spinner to the related components template.
   * @returns an Observable of an Array of Olympic model.
   */
  public getAsyncOlympics(): Observable<Olympic[]>  {
    return this.olympics$.asObservable().pipe(delay(2000));
  }

  /**
   * Function responsible for retrieving the data for a specific Olympic.
   * @param lookupId the id of the Olympic we want to fetch.
   * @returns an Observable of an Olympic model.
   */
  public getOlympicById(lookupId:number): Observable<Olympic> {
    return this.getAsyncOlympics().pipe(map(olympics => olympics.filter(olympic => olympic.id == lookupId)[0])) as Observable<Olympic>;
  }

  /**
   * Function to know how many Olympics are present in the olympics Subject.
   * @returns an Observable of number (representing the number of Olympics)
   */
  getDataLength(): Observable<number> {
    return this.getOlympics().pipe(map(olympics => olympics.length));
  }

  /**
   * Function to retrieve the error messages from the loadDataInitial() function call.
   * @returns an Array of string, the different error messages collected.
   */
  getErrorMessages(): string[] {
    return this._errors;
  }
}
