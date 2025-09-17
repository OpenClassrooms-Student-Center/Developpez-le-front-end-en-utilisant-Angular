import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { OlympicCountry } from '../models/OlympicCountry';
import { Participation } from '../models/Participation';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympicCountries$ = new BehaviorSubject<OlympicCountry[] | undefined>(undefined);
  private nbCountry$ = new BehaviorSubject<number>(0);
  private nbJO$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  loadInitialData() {

    this.http.get<any[]>(this.olympicUrl).subscribe({
      next: (countriesJson) => {
        let nbCountry : number = 0;
        let yearsJO = new Set<string>();
        const countries: OlympicCountry[] = [];
        for (const country of countriesJson) {
          const participations : Participation[] = [];
          for (const participation of country.participations) {
            const newParticipation = {
              id : participation.id,
              year : participation.year,
              city: participation.city,
              medalsCount : participation.medalsCount,
              athleteCount : participation.athleteCount
            };
            yearsJO.add(participation.year);
            participations.push(newParticipation);
          }
          const newCountry = new OlympicCountry(country.id, country.country, participations);
          nbCountry ++;
          countries.push(newCountry);
        }
        this.olympicCountries$.next(countries);
        this.nbCountry$.next(nbCountry) ;
        this.nbJO$.next(yearsJO.size);
      },
      error: (err) => {
        console.error('Erreur en chargeant les données :', err);
        this.olympicCountries$.next(undefined);
        this.nbCountry$.next(0) ;
        this.nbJO$.next(0);
      }
    });
  }
  
  getOlympicCountries() {
    return this.olympicCountries$.asObservable();
  }

  getNbCountry() {
    return this.nbCountry$.asObservable();
  }

  getNbJO() {
    return this.nbJO$.asObservable();
  }
  

  getCountryById(id: string) {
    return this.olympicCountries$.pipe(
      map((countries : OlympicCountry[] | undefined) => countries?.find((c:OlympicCountry) => c.id == id))
    );
  }

  getCountryByName(name: string): OlympicCountry | undefined{
    const countries = this.olympicCountries$.getValue();
    if (!countries) {
      return undefined;
    }
    return countries.find(c => c.countryName === name);
  }
}
