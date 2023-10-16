import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic, Olympics } from '../../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympics | undefined>(undefined);
  private olympic$ = new BehaviorSubject<Olympic | undefined>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympics>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        this.olympics$.error(error);
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(undefined);
        return caught;
      })
    );
  }

  getOlympics() : Observable<Olympics | undefined> {
    return this.olympics$.asObservable();
  }

  getOlympic$(id : number) : Observable<Olympic | undefined> {
    if(!this.olympic$.value) {
      this.loadInitialData().subscribe({
        next: (olympics) => {
          if(!olympics) {
            throw new Error("Olympics data can't be undefined or null.")
          }
          let dtrOlympic = olympics.find((dtrOlympic) => dtrOlympic?.id == id);
          this.olympic$.next(new Olympic(dtrOlympic));
        },
        error: (error) => {
          console.error("Received an error: " + error);
          // TODO Implement component to display an error occure to user
        }
      })
    } else {
      let dtrOlympic = this.olympics$.value?.find((dtrOlympic) => dtrOlympic?.id == id);
      this.olympic$.next(new Olympic(dtrOlympic));
    }
    return  this.olympic$.asObservable()
  }

  getOlympic(id : number) : Olympic {

    let dtrOlympic = this.olympics$?.value?.find((dtrOlympic) => dtrOlympic?.id == id);
    return new Olympic(dtrOlympic);
  }

  getNumberOfCountry(olympics : Olympics) : number {
    if(!olympics) return 0;
    return olympics.length;
  }

  getNumberOfJOs(olympics : Olympics) {
    if(!olympics) return 0;

    let setOfYears = new Set<number>();
    olympics.forEach((dtrOlympic) => {
      dtrOlympic?.participations.forEach((participation) => {
        setOfYears.add(participation.year);
      });
    });
    return setOfYears.size;
  }
}
