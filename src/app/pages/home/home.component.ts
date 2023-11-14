import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { OlympicService, ThemeService } from '@core/services/index.services';
import {
  OlympicData,
  MedalCountryItem,
  Participation,
} from '@core/models/olympic-data.types';

/**
 * Component representing the home page.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  /**
   * Observable for Olympic data.
   */
  public olympics$!: Observable<OlympicData>;

  /**
   * Subscription for Olympic data updates.
   */
  public olympicsSubscription$: Subscription | undefined;

  /**
   * Observable indicating whether data is loading.
   */
  public isLoading$!: Observable<boolean>;

  /**
   * The current color scheme of the application.
   */
  public colorScheme!: string;

  /**
   * Array of MedalCountryItem representing countries and their medal counts.
   */
  public medalsArray!: MedalCountryItem[];

  /**
   * Subscription for theme changes.
   */
  public themeSubscription$!: Subscription;

  /**
   * Array of indicators containing additional information about the Olympic data.
   */
  public arrayOfIndicators: { title: string; value: number }[] = [];

  constructor(
    private olympicService: OlympicService,
    private routerService: Router,
    private themeService: ThemeService,
    private titleMetaTagService: Title,
    private otherMetaTagsService: Meta
  ) {}

  ngOnInit(): void {
    this.titleMetaTagService.setTitle('Home page');

    this.olympics$ = this.olympicService.getOlympics();
    this.isLoading$ = this.olympicService.getIsLoading();

    this.medalsArray = [];

    this.olympicsSubscription$ = this.olympics$.subscribe(
      (olympicCountryData: OlympicData) => {
        const hasNoCountriesToDisplay: boolean = olympicCountryData.length < 1;
        if (hasNoCountriesToDisplay) {
          return;
        }
        this.setMedalsArray(olympicCountryData);
        this.setInfosCardValues(olympicCountryData);
      }
    );

    // Subscribe to the theme changes
    this.themeSubscription$ = this.themeService
      .getColorScheme()
      .subscribe((theme) => {
        this.colorScheme = theme;
      });
  }

  ngOnDestroy(): void {
    this.olympicsSubscription$?.unsubscribe();

    this.themeSubscription$?.unsubscribe();
  }

  /**
   * Set the medalsArray based on Olympic data for the pie chart
   * @param olympicData - Olympic data to extract medal information from.
   */
  setMedalsArray(olympicData: OlympicData): void {
    this.medalsArray = olympicData.map((countryOlympicData) => {
      const { id, country, participations } = countryOlympicData;
      return {
        id: id,
        name: country,
        value: participations.reduce((acc, cur: Participation) => {
          return acc + cur.medalsCount;
        }, 0),

        extra: {
          id,
        },
      };
    });
  }

  /**
   * Set values for the variable to be inputted to the `info-indicators` component based on Olympic data.
   * @param olympicData - Olympic data to extract additional information from.
   */
  setInfosCardValues(olympicData: OlympicData): void {
    // Calculate the total number of participations
    const totalParticipations: number = olympicData.reduce(
      (acc, cur) => acc + cur.participations.length,
      0
    );

    // Calculate the number of countries that participated
    const numberOfCountries: number = olympicData.length;

    this.arrayOfIndicators = [
      { title: 'Total participations', value: totalParticipations },
      { title: 'Number of countries', value: numberOfCountries },
    ];
  }

  /**
   * Navigate to the details page for a country based on its ID.
   * @param e - MedalCountryItem containing information about the selected country.
   */
  selectCountryById(e: MedalCountryItem<{ id: string }>): void {
    if (!e.extra) {
      return;
    }
    const { id } = e.extra;

    this.routerService.navigateByUrl(`/details/${id}`);
  }
}
