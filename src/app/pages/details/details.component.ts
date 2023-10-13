import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from '@core/models/olympic-data.types';
import { OlympicService, ThemeService } from '@core/services/index.services';
import { Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  id!: number;
  countryObject!: Country;
  private olympicsSubscription: Subscription | undefined;

  public themeSubscription$!: Subscription;
  public countryOlympic$: Observable<Country | null | undefined>;
  public isLoading$: Observable<boolean>;
  countryOlympicSubscription$!: Subscription;
  colorScheme!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private olympicService: OlympicService,
    private themeService: ThemeService
  ) {
    this.id = Number(this.activatedRoute.snapshot.params['id']);

    this.countryOlympic$ = this.olympicService.getOlympicCountryById(this.id);
    this.isLoading$ = this.olympicService.getIsLoading();
  }

  ngOnInit(): void {
    console.log(this.id);

    this.countryOlympicSubscription$ = this.countryOlympic$
      .pipe(
        tap((countryObject: Country | null | undefined) => {
          this.countryObject = countryObject as Country;
        })
      )
      .subscribe();

    this.themeSubscription$ = this.themeService
      .getColorScheme()
      .subscribe((theme) => {
        this.colorScheme = theme;
      });
  }
  ngOnDestroy(): void {
    this.olympicsSubscription?.unsubscribe();

    this.themeSubscription$?.unsubscribe();
  }
}
