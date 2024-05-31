import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { PieChart, ResponsiveOptions } from 'chartist';
import type { PieChartData, PieChartOptions } from 'chartist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);

  constructor(private olympicService: OlympicService) {}

  public countries: string[] = [];
  public medals: number[] = [];

  public medalsPerCountry = this.olympicService.getMedalsPerCountry();

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.medalsPerCountry = this.olympicService.getMedalsPerCountry();

    this.countries = this.olympicService.getCountries();

    this.medals = this.olympicService.getMedals();

    let data = {
      labels: this.countries,
      series: this.medals,
    };

    const options: PieChartOptions = {
      showLabel: true,
      startAngle: 50,
      labelInterpolationFnc: function(value, idx) {
        return '<text class="ct-label" dx="' + (idx % 2 === 0 ? -1 : 1) * 50 + '" dy="5">' + value + '</text>';
      }
    };

    const responsiveOptions: ResponsiveOptions<PieChartOptions> = [
      [
        'screen and (min-width: 640px)',
        {
          chartPadding: 30,
          labelOffset: 100,
          labelInterpolationFnc: (value) => value,
        },
      ],
      [
        'screen and (min-width: 1024px)',
        {
          labelPosition: 'inside',
          labelDirection: 'neutral',
          labelOffset: 100, // labels s'eloignent du pie quand valeur augmente
          chartPadding: 100, //pie diminue quand valeur augmente
        },
      ],
    ];

    new PieChart('#pieChart', data, options, responsiveOptions);
  }
}
