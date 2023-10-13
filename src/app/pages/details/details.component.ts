import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineChartData } from '@core/models/chart.types';
import { Country, Participation } from '@core/models/olympic-data.types';
import { OlympicService, ThemeService } from '@core/services/index.services';
import { Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  id!: number;
  countryData!: LineChartData;
  entries!: number;
  totalAthletes!: number;
  totalEarnedMedals!: number;

  private olympicsSubscription: Subscription | undefined;

  public themeSubscription$!: Subscription;
  public countryOlympic$: Observable<Country | null | undefined>;
  public isLoading$: Observable<boolean>;

  public countryOlympicSubscription$!: Subscription;
  public colorScheme!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private olympicService: OlympicService,
    private themeService: ThemeService
  ) {
    this.id = Number(this.activatedRoute.snapshot.params['id']);

    this.countryOlympic$ = this.olympicService.getOlympicCountryById(this.id);
    this.isLoading$ = this.olympicService.getIsLoading();

    this.countryData = [];
  }

  ngOnInit(): void {
    console.log(this.id);

    this.countryOlympicSubscription$ = this.countryOlympic$
      .pipe(
        tap((countryObject: Country | null | undefined) => {
          if (!countryObject) {
            return;
          }
          this.setCountryData(countryObject);
          this.setOtherInfosData();
        })
      )
      .subscribe();

    this.themeSubscription$ = this.themeService
      .getColorScheme()
      .subscribe((theme) => {
        this.colorScheme = theme;
      });
  }

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

  setOtherInfosData(): void {
    this.entries = this.countryData[0].series.length;

    this.totalAthletes = this.countryData[0].series.reduce((acc, cur) => {
      return acc + cur.value;
    }, 0);

    this.totalEarnedMedals = this.countryData[0].series.reduce((acc, cur) => {
      return acc + cur.extra?.athleteCount;
    }, 0);
  }

  goBackToPreviousPage(e: MouseEvent) {
    const button = e.currentTarget as HTMLButtonElement;

    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.olympicsSubscription?.unsubscribe();

    this.themeSubscription$?.unsubscribe();
  }
}
