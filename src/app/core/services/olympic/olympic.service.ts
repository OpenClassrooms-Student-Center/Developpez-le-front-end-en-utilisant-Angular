import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country, Countries } from '../../models/Country';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private countries$ = new BehaviorSubject<Countries | undefined>(undefined);
  private country$ = new BehaviorSubject<Country | undefined>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Countries>(this.olympicUrl).pipe(
      tap((value) => this.countries$.next(value)),
      catchError((error, caught) => {
        this.countries$.error(error);
        console.error(error);
        this.countries$.next(undefined);
        return caught;
      })
    );
  }

  getCountries() : Observable<Countries | undefined> {
    return this.countries$.asObservable();
  }

  getCountry(id : number) : Observable<Country | undefined> {
    if(!this.country$.value) {
      this.loadInitialData().subscribe({
        next: (countries) => {
          if(!countries) {
            throw new Error("Countries data can't be undefined or null.")
          }
          let DtrCountry = countries.find((DtrCountry) => DtrCountry?.id == id);
          this.country$.next(new Country(DtrCountry));
        },
        error: (error) => {
          console.error("Received an error: " + error);
          this.country$.error(error);
        }
      })
    } else {
      let DtrCountry = this.countries$.value?.find((DtrCountry) => DtrCountry?.id == id);
      this.country$.next(new Country(DtrCountry));
    }
    return  this.country$.asObservable()
  }

  /**
   * Get number of country
   * @param countries : Array<DtrCountry>
   * @returns number
   */
  getNumberOfCountry(countries : Countries) : number {
    if(!countries) return 0;
    return countries.length;
  }

  /**
   * Get number of JOs organised
   * @param countries : Array<DtrCountry>
   * @returns number
   */
  getNumberOfJOs(countries : Countries) {
    if(!countries) return 0;

    let setOfYears = new Set<number>();
    countries.forEach((DtrCountry) => {
      DtrCountry?.participations.forEach((participation) => {
        setOfYears.add(participation.year);
      });
    });
    return setOfYears.size;
  }

  /**
     * Get number of entries
     * @param country : Country
     * @returns 
     */
  public getNbEntries(country : Country) : number {
    return country.participations.length;
  }

  /**
   * Get total number of medals won
   * @param country : Country
   * @returns number
   */
  public getTotalNbMedals(country : Country) : number {
      if (country.participations.length === 0) return 0
      return country.participations.map((participation) => participation.medalsCount).reduce((a,b) => a+b);
  }

  /**
   * Get total number of athletes who participated
   * @param country : Country
   * @returns number
   */
  public getTotalNbOfAthletes(country : Country) : number {
      if (country.participations.length === 0) return 0
      return country.participations.map((participation) => participation.athleteCount).reduce((a,b) => a+b);
  }
}
