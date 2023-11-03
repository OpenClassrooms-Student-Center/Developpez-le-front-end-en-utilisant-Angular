import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { ICountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: Highcharts.Options = {
    title: {
      text: '',
    },
    plotOptions: {
      series: {
        pointStart: 0
      }
    },
    series: [
      {
        name: '🥇',
        data: [],
        type: 'line',
      },
    ],
  };
  public updateFlag: boolean = false;

  public countryId: string|null = null;
  public countryDetails!: ICountry;
  public numberOfMedals: number = 0;
  public numberOfAthletes: number = 0;

  constructor(private route: ActivatedRoute, private olympicService: OlympicService) { }

  ngOnInit(): void {
    this.countryId = this.route.snapshot.queryParamMap.get('countryId');
    if (this.countryId) {
      this.olympicService.getCountryById(this.countryId).subscribe(countryDetails => {
        if (countryDetails) {
          this.countryDetails = countryDetails;
          this.numberOfMedals = countryDetails.participations.reduce((prev, participation) => participation.medalsCount + prev, 0);
          this.numberOfAthletes = countryDetails.participations.reduce((prev, participation) => participation.athleteCount + prev, 0);
          console.log(this.countryDetails);

          if (this.chartOptions.series) {
            this.chartOptions.series[0] = {
              name: '🥇',
              data: countryDetails.participations.map(participation => participation.medalsCount),
              type: 'line',
            } as Highcharts.SeriesLineOptions;
          }

          if (this.chartOptions.plotOptions && this.chartOptions.plotOptions.series) {
            this.chartOptions.plotOptions.series.pointStart = countryDetails.participations[0].year;
          }
        }
      });
    }
  }

}
