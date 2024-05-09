import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  //private olympics$ = new BehaviorSubject<any>(undefined);
  private olympicList: Olympic[] = [];

  constructor(private http: HttpClient) { }

  getOlympics(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe();
  }

  getOlympicByCountryName(countryName: string) {
    const olympic: Olympic | undefined = this.olympicList.find(olympic => olympic.country === countryName);
    return olympic;
  }

  // loadInitialData() {
  //   return this.http.get<any>(this.olympicUrl).pipe(
  //     tap((value) => this.olympics$.next(value)),
  //     catchError((error, caught) => {
  //       // TODO: improve error handling
  //       console.error(error);
  //       // can be useful to end loading state and let the user know something went wrong
  //       this.olympics$.next(null);
  //       return caught;
  //     })
  //   );
  // }

  // getOlympics() {
  //   return this.olympics$.asObservable();
  // }
}
