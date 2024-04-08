import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, find, map, Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Olympic} from "../models/Olympic";
import {MedalData} from "../models/MedalData";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]); // BehaviorSubject contenant un tableau d'objets Olympic

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[]> { // Renvoie un Observable qui émet un tableau d'objets Olympic
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error(error);
        this.olympics$.next([]); // En cas d'erreur, émet un tableau vide pour signaler un problème
        return caught;
      })
    );
  }
    /**
     * Obtient un Observable émettant les données olympiques.
     * @returns Observable émettant les données olympiques.
     */

    getOlympics():Observable<Olympic[]> { // Renvoie un Observable représentant la valeur courante du BehaviorSubject
      return this.olympics$.asObservable();
    }


    /**
     * Récupère les détails d'un pays spécifique.
     * @param countryId ID du pays.
     * @returns Observable émettant les détails du pays spécifié.
     */
    getCountryDetails(countryId: string | number): Observable<Olympic[]> {
      // Récupérer les données en cache
      const cachedData = this.olympics$.getValue();

      // Rechercher le pays dans les données en cache
      const country = cachedData.find(countryIdItem => countryIdItem.id == countryId); // Utiliser == au lieu de === car countryId peut être de type string ou number

      // Vérifier si le pays a été trouvé dans les données en cache
      if (country) {
        // Retourner les détails du pays sous forme de tableau avec un observable de type Olympic[]
        return of([country]);
      } else {
        // Si le pays n'est pas trouvé dans les données en cache, charger les données initiales depuis le service
        return this.loadInitialData().pipe(
          map((data: Olympic[]) => {
            // Rechercher à nouveau le pays dans les données fraîchement chargées
            const country = data.find(countryIdItem => countryIdItem.id == countryId); // Utiliser == au lieu de === car countryId peut être de type string ou number

            // Vérifier si le pays a été trouvé dans les données fraîchement chargées
            return country ? [country] : []; // Retourner les détails du pays sous forme de tableau s'il est trouvé, sinon retourner un tableau vide
          })
        );
      }
    }

    /**
     * Calcule le nombre de pays participants.
     * @param olympicData Données contenant des informations olympiques.
     * @returns Nombre de pays participants.
     */
    calculCountry(olympicData: Olympic[]): number {
      const countries = new Set();
      for (const country of olympicData) {
        countries.add(country.country);
      }
      return countries.size;
    }

    /**
     * Calcule le nombre d'éditions des JO.
     * @param olympicData Données olympiques.
     * @returns Nombre d'éditions des JO.
     */
    calculJo(olympicData: Olympic[]): number {
      const jo = new Set();
      for (const country of olympicData) {
        for (const participation of country.participations) {
          jo.add(participation.year);
        }
      }
      return jo.size;
    }

    /**
     * Calcule les données pour une représentation de tableau des médailles.
     * @param olympicData Données contenant des informations olympiques.
     * @returns Données formatées pour un tableau des médailles.
     */
    calculOlympicData(olympicData: Olympic[]): MedalData[] {
      const countryMedals = this.getCountryMedals(olympicData);
      return this.convertMapToArray(countryMedals);
    }


    /**
     * Calcule le nombre total de médailles remportées par chaque pays.
     * @param olympicData Données olympiques.
     * @returns Un objet contenant le nombre total de médailles pour chaque pays.
     */
    getCountryMedals(olympicData: Olympic[]): { [country: string]: MedalData } {
      const countryMedals: { [country: string]: MedalData } = {};

      for (const country of olympicData) {
        if (!countryMedals.hasOwnProperty(country.country)) {
          countryMedals[country.country] = {
            value: 0,
            name: country.country,
            extra: { id: country.id },
          };
        }

        for (const participation of country.participations) {
          countryMedals[country.country].value += participation.medalsCount;
        }
      }

      return countryMedals;
    }

    /**
     * Récupère le nombre total de médailles pour chaque pays.
     * Cette méthode est redondante avec getCountryMedals, on peut la supprimer.
     * @param olympicData Données olympiques.
     * @returns Un objet contenant le nombre total de médailles pour chaque pays.
     */

    getCountryTotalMedals(olympicData: Olympic[]): { [country: string]: number } {
      const countryMedals: { [country: string]: number } = {};

      for (const country of olympicData) {
        for (const participation of country.participations) {
          countryMedals[country.country] =
            (countryMedals[country.country] || 0) + participation.medalsCount;
        }
      }

      return countryMedals;
    }
    /**
     * Convertit un objet contenant les médailles par pays en un tableau de MedalData.
     * @param countryMedals Objet contenant les médailles par pays.
     * @returns Un tableau de MedalData.
     */
    convertMapToArray(countryMedals: { [country: string]: MedalData }): MedalData[] {
      const data: MedalData[] = [];
      for (const [country, medals] of Object.entries(countryMedals)) {
        data.push({
          name: country,
          value: medals.value,
          extra: { id: medals.extra.id },
        });
      }

      return data;
    }





  }
