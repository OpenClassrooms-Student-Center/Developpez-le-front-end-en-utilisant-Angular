import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { Observable, Subscription } from 'rxjs';

import { LineChartData } from '@core/models/chart.types';
import { Country } from '@core/models/olympic-data.types';
import { OlympicService, ThemeService } from '@core/services/index.services';
/**
 * DetailsComponent represents the page displaying detailed information about a specific country's Olympic records.
 */
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  /**
   * The ID of the country for which the Olympic records are displayed.
   */
  id!: number;

  /**
   * Line chart Data representing the country's Olympic records.
   */
  countryData!: LineChartData;

  /**
   * Subscription for Olympic data updates.
   */
  private olympicsSubscription: Subscription | undefined;

  /**
   * Subscription for Olympic data updates.
   */
  public themeSubscription$!: Subscription;

  /**
   * Observable for the country's Olympic data.
   */
  public countryOlympic$: Observable<Country | null | undefined>;
  /**
   * Observable indicating whether data is loading.
   */
  public isLoading$: Observable<boolean>;

  /**
   * Subscription for country Olympic data updates.
   */
  public countryOlympicSubscription$!: Subscription;
  /**
   * The current color scheme of the application.
   */
  public colorScheme!: string;

  /**
   * Array of indicators containing additional information about the country's Olympic records for the info-indicators component
   */
  public arrayOfIndicators: { title: string; value: number }[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private olympicService: OlympicService,
    private themeService: ThemeService,
    private titleMetaTagService: Title,
    private otherMetaTagsService: Meta
  ) {
    this.id = Number(this.activatedRoute.snapshot.params['id']);

    this.countryOlympic$ = this.olympicService.getOlympicCountryById(this.id);
    this.isLoading$ = this.olympicService.getIsLoading();

    this.countryData = [];
  }

  ngOnInit(): void {
    this.titleMetaTagService.setTitle(
      `Fetching olympic records for country of ID ${this.id}`
    );

    this.countryOlympicSubscription$ = this.countryOlympic$.subscribe(
      (countryObject: Country | null | undefined) => {
        if (!countryObject) {
          this.titleMetaTagService.setTitle(
            `Error: There is no country with an ID of ${this.id}`
          );
          return;
        }

        this.setCountryData(countryObject);
        this.setOtherInfosData();
        this.titleMetaTagService.setTitle(
          `${countryObject.country} olympic records`
        );
      }
    );

    this.themeSubscription$ = this.themeService
      .getColorScheme()
      .subscribe((theme) => {
        this.colorScheme = theme;
      });
  }

  /**
   * Sets the data for displaying the country's Olympic records on the line chart
   *
   * @param {Country} countryObject - The country's Olympic data.
   */
  setCountryData(countryObject: Country): void {
    const { country, participations } = countryObject;
    this.countryData = [{ name: country, series: [] }];

    for (let i = 0; i < participations.length; i++) {
      const { year, medalsCount, athleteCount } = participations[i];

      this.countryData[0].series.push({
        name: year.toString(),
        value: medalsCount,
        extra: {
          athleteCount,
        },
      });
    }
  }

  /**
   * Sets data for the `info-indicators` component based on the country's Olympic records.
   */
  setOtherInfosData(): void {
    const entries: number = this.countryData[0].series.length;

    const totalAthletes: number = this.countryData[0].series.reduce(
      (acc, cur) => {
        return acc + cur.extra?.athleteCount;
      },
      0
    );

    const totalEarnedMedals: number = this.countryData[0].series.reduce(
      (acc, cur) => {
        return acc + cur.value;
      },
      0
    );

    this.arrayOfIndicators = [
      { title: 'Entries', value: entries },
      { title: 'Total number of earned medals', value: totalEarnedMedals },
      { title: 'Total number of athletes', value: totalAthletes },
    ];
  }

  /**
   * Navigates back to the previous page.
   *
   * @param {MouseEvent} e - The click event.
   */
  goBackToPreviousPage(e: MouseEvent): void {
    const button = e.currentTarget as HTMLButtonElement;

    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.olympicsSubscription?.unsubscribe();

    this.themeSubscription$?.unsubscribe();
  }
}
