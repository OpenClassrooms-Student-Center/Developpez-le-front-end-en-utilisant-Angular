import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Country } from '../models/Olympic';
import { PieChart } from '../models/PieChart';
import { TotalOlympicGamesAndCountry } from '../models/TotalOlympicGamesAndCountry';
import { EntriesMedalsAthletes } from '../models/EntriesMedalsAthletes';
import { MedalData } from '../models/MedalData';
import { MedalYearData } from '../models/MedalData';

/**
 * Service for managing Olympic data.
 * It provides functionality to load, retrieve, and process Olympic country participation data.
 */
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympicsSubject$ = new BehaviorSubject<Country[]>([]);
  private elementSelectionneSubject$ = new BehaviorSubject<string>('');
  private entriesMedalsAthletesResultSubject$ = new BehaviorSubject<EntriesMedalsAthletes>({ entries: 0, medals: 0, athletes: 0 });
  private isLoadingSubject$ = new BehaviorSubject<boolean>(false);


  /**
   * Stores the selected element's name.
   * Initially an empty string.
   */
  elementSelectionne: string = '';

  /**
   * Holds the result for entries, medals, and athletes.
   * Initially set with all values to 0.
   */
  entriesMedalsAthletesResult: EntriesMedalsAthletes = {
    entries: 0,
    medals: 0,
    athletes: 0
  };

  /**
   * Constructs the OlympicService.
   * @param http HttpClient used for making HTTP requests.
   */
  constructor(private http: HttpClient, private router: Router) { }

  
  /**
   * Gets an observable of the current Olympic data.
   * @returns Observable of the Country array.
  */

  get isLoading$(): Observable<boolean> {
    return this.isLoadingSubject$.asObservable();
  }
 get olympics$() {
   return this.olympicsSubject$.asObservable();
  }
  
  // Getters for BehaviorSubjects as observables
  
  get elementSelectionne$() {
    return this.elementSelectionneSubject$.asObservable();
  }
  
  get entriesMedalsAthletesResult$() {
    return this.entriesMedalsAthletesResultSubject$.asObservable();
  }
  

  updateElementSelectionne(newElementSelectionne: string): void {
    this.elementSelectionne = newElementSelectionne;
    this.elementSelectionneSubject$.next(newElementSelectionne);
  }
  
  /**
   * Loads initial Olympic data from a JSON file.
   * Updates the observable with new data upon successful retrieval, or sets it to an empty array in case of an error.
   * @returns Observable of the HTTP request.
   */
  loadInitialData(): Observable<Country[]> {
    console.log("loadInitialData");
    this.isLoadingSubject$.next(true);
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((countries) => {
        this.olympicsSubject$.next(countries)
        console.log('data is create');
        this.isLoadingSubject$.next(false);
      }),
      catchError((error) => {
        console.error(error);
        this.olympicsSubject$.next([]);
        this.isLoadingSubject$.next(false);
        throw error;
      })
    );
  }

  /**
   * Processes data for pie chart representation.
   * @param data Array of Country data.
   * @returns Array of PieChart data.
  */
 processDataForPieChart(): PieChart[] {
   let data = this.olympicsSubject$.getValue();
    return data.map(country => ({
      name: country.country,
      value: country.participations.reduce((acc, curr) => acc + curr.medalsCount, 0),
    }));
  }

  /**
   * Processes the given data to count the number of unique Olympic years and countries.
   * @param data Array of Country data.
   * @returns Object containing counts of unique Olympic years and countries.
   */
  processOlympicGamesAndCountry(): TotalOlympicGamesAndCountry {
    let data = this.olympicsSubject$.getValue();
    console.log(data);
    const uniqueYears = new Set<number>();
    const uniqueCountries = new Set<string>();

    data.forEach(country => {
      country.participations.forEach(participation => {
        uniqueYears.add(participation.year);
        uniqueCountries.add(country.country);
      });
    });

    return {
      totalOlympicGames: uniqueYears.size,
      totalCountries: uniqueCountries.size,
    };
  }

  /**
   * Processes entries, medals, and athletes data for a given country.
   * @param data Array of Country data.
   * @param nameCountry Name of the country to process.
   * @returns Object containing entries, medals, and athletes counts.
   */
  processEntriesMedalsAthletes(nameCountry: string): EntriesMedalsAthletes {
    let data = this.olympicsSubject$.getValue();
    let entriesValue = 0, medalsValue = 0, athletesValue = 0;

    data.forEach(country => {
      if (country.country === nameCountry) {
        entriesValue = country.participations.length;
        country.participations.forEach(participation => {
          medalsValue += participation.medalsCount;
          athletesValue += participation.athleteCount;
        });
      }
    });

    const result: EntriesMedalsAthletes = { entries: entriesValue, medals: medalsValue, athletes: athletesValue };
    this.entriesMedalsAthletesResultSubject$.next(result);
    return result;
  }

  /**
   * Processes and returns medal data for a specified country over various years.
   * 
   * @param {Country[]} data - An array of Country objects containing participation data.
   * @param {string} nameCountry - The name of the country for which to process medal data.
   * @returns {MedalData} An object representing the medal data for the specified country.
   *                     This includes the country's name and an array of medal counts per year.
   *
   * Each element in the 'series' array of the returned object is a 'MedalYearData' instance.
   * It represents the number of medals won by the country in a specific year.
   */
  processCountryMedalsPerDate(nameCountry: string): MedalData[] {
    let data = this.olympicsSubject$.getValue();
    console.log(data);
    const countryData = data.find(country => country.country === nameCountry);
    if (!countryData) {
      return [];
    }

    const medalSeries: MedalYearData[] = countryData.participations.map(participation => {
      return {
        name: participation.year.toString(),
        value: participation.medalsCount
      };
    });

    const medalData: MedalData = {
      name: nameCountry,
      series: medalSeries
    };

    return [medalData];
  }

  isValidCountry(countryName: string): Observable<boolean> {
    return this.olympicsSubject$.pipe(
      map((data: Country[]) => {
        return data.some(country => country.country === countryName);
      })
    );
  }

  /**
   * Handles selection events, updating relevant observables.
   * @param event Selection event object.
   */
  onSelect(event: any): void {
    this.elementSelectionne = event.name;
    this.elementSelectionneSubject$.next(event.name);
    this.router.navigate([`/${event.name}`]);
  }

  /**
   * Resets the state of selection observables.
   */
  retour(): void {
    this.elementSelectionne = '';
    this.elementSelectionneSubject$.next('');
    this.router.navigate([``]);
  }
}
