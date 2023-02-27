import { DataLineChart } from 'src/app/core/models/DataLineChart';
import { Participation } from 'src/app/core/models/Participation';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from './../../core/services/olympic.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Olympic } from 'src/app/core/models/Olympic';
import { StatisticCardComponent } from 'src/app/core/components/statistic-card/statistic-card.component';


@Component({
  selector: 'app-country-data',
  templateUrl: './country-data.component.html',
  styleUrls: ['./country-data.component.css']
})
export class CountryDataComponent implements OnInit {

  public countryName: string = '';

  public stats!: StatisticCardComponent[];

  public dataChart : DataLineChart[] = [];

  public hasError$: Observable<boolean> = of(false);

  private countryDataSubscription$!: Subscription;

  constructor(private OlympicService: OlympicService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    // get country Id from URL
    const countryId = +(this.route.snapshot.params['id']);

    // Get information from service and affects the data to the front components
    this.countryDataSubscription$ = this.OlympicService.getOlympicByCountryId(countryId).subscribe(
      {
        next: (Olympic) => {
          this.countryName = Olympic.country;
          this.dataChart = [this.getDataLineChart(Olympic)];
          this.stats = [
            {
              label: "Number of entries",
              value: Olympic.participations.length
            },
            {
              label: "Total number medals",
              value: this.getMedalsCount(Olympic.participations)
            },
            {
              label: "Total number of athletes",
              value: this.getAthleteCount(Olympic.participations)
            }];
        },
          error: err => console.error('An error occurend', err),
          complete: () => console.log('Completed')
      }
    )

    // retrieve the "hasError$" from the service in order to manage the display on the front
    this.hasError$ = this.OlympicService.getError();
  }

  ngOnDestroy(): void {
    this.countryDataSubscription$.unsubscribe();
  }

  // Map country data to fit the DataLineChart interface
  private getDataLineChart(olympic: Olympic): DataLineChart {
    return {
        "name": olympic.country,
        "series": olympic.participations.map((participation: Participation) => {
          return {
            name: String(participation.year),
            value: participation.medalsCount,
          } }),
      };
  }

  // Return the total number of Medals from a country
  private getMedalsCount(participations: Participation[]): number {
    return participations.filter(
          value => value.medalsCount !== 0
        ).reduce(
          (previousValue, currentValue) => previousValue + currentValue.medalsCount, 0
        );
  }

  // Return the total number of Athlete from a country
  private getAthleteCount(participations: Participation[]): number {
    return participations.filter(
          value => value.athleteCount !== 0
        ).reduce((previousValue, currentValue) => previousValue + currentValue.athleteCount, 0
        );
  }
}
