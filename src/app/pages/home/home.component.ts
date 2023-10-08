import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OlympicService, ThemeService } from '@core/services/index.services';
import { OlympicData, MedalCountryItem } from '@core/models/olympic-data.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$!: Observable<OlympicData>;
  public isLoading$!: Observable<boolean>;
  public medalsArray!: MedalCountryItem[];
  public scheme$!: Observable<string>;

  private olympicsSubscription: Subscription | undefined;

  constructor(
    private olympicService: OlympicService,
    private routerService: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.isLoading$ = this.olympicService.getIsLoading();

    this.medalsArray = [];

    this.olympicsSubscription = this.olympics$
      .pipe(
        tap((olympicCountryData) => {
          const hasNoCountriesToDisplay: boolean =
            olympicCountryData.length < 1;
          if (hasNoCountriesToDisplay) {
            return;
          }
          this.setMedalsArray(olympicCountryData);
          console.log(this.medalsArray);
        })
      )
      .subscribe();

    this.scheme$ = this.themeService.getColorScheme();
  }

  ngOnDestroy(): void {
    this.olympicsSubscription?.unsubscribe();
  }

  setMedalsArray(olympicData: OlympicData) {
    this.medalsArray = olympicData.map((countryOlympicData) => {
      const { id, country, participations } = countryOlympicData;
      return {
        id: id,
        name: country,
        value: participations.reduce((acc, cur) => {
          return acc + cur.medalsCount;
        }, 0),

        extra: {
          id,
        },
      };
    });
  }

  selectCountryById(e: MedalCountryItem): void {
    const { id, name, value } = e;
    this.routerService.navigateByUrl(`/details/`);
  }
}
