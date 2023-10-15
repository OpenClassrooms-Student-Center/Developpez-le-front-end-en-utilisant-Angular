import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { OlympicService, ThemeService } from '@core/services/index.services';
import {
  OlympicData,
  MedalCountryItem,
  Participation,
} from '@core/models/olympic-data.types';
import { formatLocalizedPrecisionNumber } from '@utils/helpers/internalization.helpers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$!: Observable<OlympicData>;
  public olympicsSubscription$: Subscription | undefined;

  public isLoading$!: Observable<boolean>;
  public colorScheme!: string;

  public medalsArray!: MedalCountryItem[];
  public totalParticipations!: string;
  public numberOfCountries!: string;
  public themeSubscription$!: Subscription;

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

    this.olympicsSubscription$ = this.olympics$
      .pipe(
        tap((olympicCountryData) => {
          const hasNoCountriesToDisplay: boolean =
            olympicCountryData.length < 1;
          if (hasNoCountriesToDisplay) {
            return;
          }
          this.setMedalsArray(olympicCountryData);
          this.setInfosCardValues(olympicCountryData);
        })
      )
      .subscribe();

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

  setMedalsArray(olympicData: OlympicData) {
    this.medalsArray = olympicData.map((countryOlympicData) => {
      const { id, country, participations } = countryOlympicData;
      return {
        id: id,
        name: country,
        value: formatLocalizedPrecisionNumber(
          participations.reduce((acc, cur: Participation) => {
            return acc + cur.medalsCount;
          }, 0)
        ),

        extra: {
          id,
        },
      };
    });
  }

  setInfosCardValues(olympicData: OlympicData) {
    // Calculate the total number of participations
    this.totalParticipations = formatLocalizedPrecisionNumber(
      olympicData.reduce((acc, cur) => acc + cur.participations.length, 0)
    );

    // Calculate the number of countries that participated
    this.numberOfCountries = formatLocalizedPrecisionNumber(olympicData.length);
  }

  selectCountryById(e: MedalCountryItem<{ id: string }>): void {
    if (!e.extra) {
      return;
    }
    const { id } = e.extra;

    this.routerService.navigateByUrl(`/details/${id}`);
  }
}
