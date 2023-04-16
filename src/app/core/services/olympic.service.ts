import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  private olympicUrl:string = './assets/mock/olympic.json';
  private olympics$:BehaviorSubject<Olympic[]> = new BehaviorSubject<Olympic[]>([]);
  private _errors:string[] = [];

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        this._errors.push(error.errorMessage);
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getAsyncOlympics() {
    return this.olympics$.asObservable().pipe(delay(2000));
  }

  getOlympicById(lookupId:number):Observable<Olympic> {
    let olympic =  this.getAsyncOlympics().pipe(map(olympics => olympics.filter(olympic => olympic.id == lookupId)[0])) as Observable<Olympic>;
    return olympic;
  }

  getDataLength():Observable<number> {
    return this.getOlympics().pipe(map(olympics => olympics.length));
  }

  getErrorMessages(): string[] {
    return this._errors;
  }
}
