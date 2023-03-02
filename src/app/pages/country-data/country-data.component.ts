import { DataLineChart } from 'src/app/core/models/DataLineChart';
import { Participation } from 'src/app/core/models/Participation';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from './../../core/services/olympic.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Olympic } from 'src/app/core/models/Olympic';
import { StatisticCardListComponent } from 'src/app/core/components/statistic-card-list/statistic-card-list.component';


@Component({
  selector: 'app-country-data',
  templateUrl: './country-data.component.html',
  styleUrls: ['./country-data.component.css']
})
export class CountryDataComponent implements OnInit {

  public stats: StatisticCardListComponent = new StatisticCardListComponent();

  public dataChart : DataLineChart[] = [];

   private countryDataSubscription$!: Subscription;

  constructor(private OlympicService: OlympicService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    // get country Id from URL
    const countryId = +(this.route.snapshot.params['id']);

    // Get information from service and affects the data to template
    this.countryDataSubscription$ = this.OlympicService.getOlympicByCountryId(countryId).subscribe(
      {
        next: (Olympic) => {
          this.dataChart = [this.getDataLineChart(Olympic)];
          this.stats = {
                          titleCard : Olympic.country,
                          statisticCards : [
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
                              }]
                        };
        },
          error: err => console.error('An error occurend', err),
          complete: () => console.log('Completed')
      }
    )
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

  goBack(): void {
    this.router.navigateByUrl('');
  }

}


