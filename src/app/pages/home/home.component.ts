import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { ICountry, Olympics } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympics> = of(null);
  private ngUnsubscribe = new Subject<void>();
  public Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: Highcharts.Options = {
    title: {
      text: '',
    },
    tooltip: {
      pointFormat: `{series.name} <b>{point.y}</b>`,
    },
    series: [
      {
        name: '🥇',
        data: [],
        type: 'pie',
      },
    ],
  };
  public updateFlag: boolean = false;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((countries) => {
        if (Array.isArray(countries)) {
          if (this.chartOptions.series) {
            this.chartOptions.series[0] = {
              name: '🥇',
              data: countries.map((countryData: ICountry) => ({
                name: countryData.country,
                y: countryData.participations.reduce(
                  (acc, country) => acc + country.medalsCount,
                  0
                ),
                events: {
                  click: () => {
                    this.router.navigate(['/details'], {
                      queryParams: { countryId: countryData.id },
                    });
                  },
                },
              })),
              type: 'pie',
            } as Highcharts.SeriesPieOptions;

            this.updateFlag = true;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
