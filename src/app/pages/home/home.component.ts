
import { DataPieChart } from './../../core/models/DataPieChart';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { StatisticCardListComponent } from 'src/app/core/components/statistic-card-list/statistic-card-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public stats!: StatisticCardListComponent;

  public dataChart : DataPieChart[] = [];
  private olympicSubscription$!: Subscription;

  constructor(private olympicService: OlympicService,
              private router: Router) { }

  ngOnInit(): void {

    // Get information from service and affects the data to template
    this.olympicSubscription$ = this.olympicService.getOlympics().subscribe(
      {
        next: (olympics: Olympic[]) => {
          this.dataChart = this.getDataPieChart(olympics);
          this.stats = {
                        titleCard : "Medals per country",
                        statisticCards : [{
                                            label: "Number of JOs",
                                            value: this.getJOsCount(olympics)
                                          },
                                          {
                                            label: "Number of countries",
                                            value: olympics.length
                                          }]
                        };
          },
          error: err => console.error('An error occurend', err),
          complete: () => console.log('Completed')
      }
    )
  }

  ngOnDestroy(): void {
    this.olympicSubscription$.unsubscribe();
  }

  // Map country data to fit the DataPieChart interface
  private getDataPieChart(olympics: Olympic[]): DataPieChart[] {
    const data = olympics.map((olympic) => {
      return {
        name: olympic.country,
        value: this.getMedalsCount(olympic.participations),
        extra: olympic.id,
      } });
    return data;
  }

  /**
  * Return the total number of JO by getting all JO years
  * from participations and filter the duplicated value.
  */
  private getJOsCount(olympics: Olympic[]): number {
      const yearsJO = olympics.flatMap((olympic) => olympic.participations.map((participation) => participation.year));
      // yearsJO contains duplicate, remove duplicate
      const yearsJOFiltered = yearsJO.filter((item, index) => yearsJO.indexOf(item) === index);
      // return count of unique JOs year
      return yearsJOFiltered.length;
  }

    // Return the total number of Medals from a country
  private getMedalsCount(participations: Participation[]): number {
      return participations.filter(
        value => value.medalsCount !== 0
        ).reduce(
          (previousValue, currentValue) => previousValue + currentValue.medalsCount, 0
        );

  }

  /**
  * Get the country selected id from extra data on the chart
  * and navigate to the country data of this selected country
  */
  onSelect(data: any): void {
    this.router.navigateByUrl(`country/${data.extra}`);
  }


}


