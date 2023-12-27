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
  private countryIdSubject$ = new BehaviorSubject<number>(1);
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

  countryId!: number | null;

  countryName!: string | null;

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

  get countryId$() {
    return this.countryIdSubject$.asObservable();
  }

  /**
   * Updates the selected element's name and emits the new value.
   * @param newElementSelectionne New name of the selected element.
   */
  updateElementSelectionne(newElementSelectionne: string): void {
    this.elementSelectionne = newElementSelectionne;
    this.elementSelectionneSubject$.next(newElementSelectionne);
  }

  /**
   * Updates the country ID based on the given country name.
   * @param countryName Name of the country to find the ID for.
   */
  updateCountryId(countryName: string | null): void {
    console.log(countryName);
    this.countryId = this.countryIdByName(countryName) || -1; // Use -1 as a default value
    this.countryIdSubject$.next(this.countryId);
    console.log(this.countryId);
  }

  /**
   * Loads initial Olympic data from a JSON file.
   * Updates the observable with new data upon successful retrieval, or sets it to an empty array in case of an error.
   * @returns Observable of the HTTP request.
   */
  loadInitialData(): Observable<Country[]> {
    this.isLoadingSubject$.next(true);
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((countries) => {
        this.olympicsSubject$.next(countries)
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
 * Get the country ID by its name.
 * @param countryName - The name of the country to search for.
 * @returns The ID of the country if found, or undefined if not found.
 */
countryIdByName(countryName: string | null): number | undefined {
  if (countryName === null) {
    return undefined;
  }
  const lowercaseCountryName = countryName.toLowerCase();
  const country = this.olympicsSubject$.getValue().find((c) => c.country.toLowerCase() === lowercaseCountryName);

  return country?.id;
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
    let countryId = this.countryIdSubject$.getValue();
    let entriesValue = 0, medalsValue = 0, athletesValue = 0;

    data.forEach(country => {
      if (country.id === countryId) {
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
  processCountryMedalsPerDate(): MedalData[] {
    let data = this.olympicsSubject$.getValue();
    let countryId = this.countryIdSubject$.getValue();
    const countryData = data.find(country => country.id === countryId);
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
      name: countryData.country,
      series: medalSeries
    };

    return [medalData];
  }

  /**
 * Checks if the currently selected country ID is valid.
 * @returns Observable emitting true if the country ID is valid, false otherwise.
 */
  isValidCountry(): Observable<boolean> {
    let countryId = this.countryIdSubject$.getValue();
    return this.olympicsSubject$.pipe(
      map((data: Country[]) => {
        return data.some(country => country.id === countryId);
      })
    );
  }

  /**
   * Handles selection events, updating relevant observables.
   * @param event Selection event object.
   */
  onSelect(event: any): void {
    this.updateCountryId(event.name);
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
