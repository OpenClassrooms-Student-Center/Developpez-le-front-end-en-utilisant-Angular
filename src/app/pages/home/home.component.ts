import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable, of } from 'rxjs';
import { ICountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  public Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: Highcharts.Options = {
    title: {
      text: ''
    },
    tooltip: {
      pointFormat: `{series.name} <b>{point.y}</b>`
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

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((countries) => {
      if (Array.isArray(countries)) {
        if (this.chartOptions.series) {
          this.chartOptions.series[0] = {
            data: countries.map((countryData: ICountry) => ({
              name: countryData.country,
              y: countryData.participations.reduce((acc, country) => acc + country.medalsCount, 0)
            })),
            type: 'pie',
          } as Highcharts.SeriesPieOptions;

          this.updateFlag = true;
        }
      }
    });
  }
}
