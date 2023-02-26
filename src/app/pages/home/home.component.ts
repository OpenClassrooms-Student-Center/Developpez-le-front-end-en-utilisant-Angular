import { DataPieChart } from './../../core/models/DataPieChart';
import { StatisticCardComponent } from './../../core/components/statistic-card/statistic-card.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  stats!: StatisticCardComponent[];

  joCount: number = 0;
  countryCount: number = 0;

  olympicSubscription!: Subscription;

  dataChart : DataPieChart[] = [];

  constructor(private olympicService: OlympicService,
              private router: Router) { }

  ngOnInit(): void {

    this.olympicSubscription = this.olympicService.getOlympics().subscribe(
      {
        next: (olympics: Olympic[]) => {
          this.joCount =  this.getJOsCount(olympics);
          this.countryCount = olympics.length;
          this.dataChart = this.getDataPieChart(olympics);
          this.stats = [
            {
              label: "Number of JOs",
              value: this.joCount
            },
            {
              label: "Number of countries",
              value: this.countryCount
            }];
          },
          error: err => console.error('An error occurend', err),
          complete: () => console.log('Completed')
      }
    )
  }

  ngOnDestroy(): void {
    this.olympicSubscription.unsubscribe();
  }

  private getDataPieChart(olympics: Olympic[]): DataPieChart[] {
    const data = olympics.map((olympic) => {
      return {
        name: olympic.country,
        value: this.getMedalsCount(olympic.participations),
        extra: olympic.id,
      } });
    return data;
  }

  private getJOsCount(olympics: Olympic[]): number {
      const yearsJO = olympics.flatMap((olympic) => olympic.participations.map((participation) => participation.year));
      // yearsJO contains duplicate, remove duplicate
      const yearsJOFiltered = yearsJO.filter((item, index) => yearsJO.indexOf(item) === index);
      // return count of unique JOs year
      return yearsJOFiltered.length;
  }

  private getMedalsCount(participations: Participation[]): number {
      return participations.filter(
        value => value.medalsCount !== 0
        ).reduce(
          (previousValue, currentValue) => previousValue + currentValue.medalsCount, 0
        );

  }

  onSelect(data: any): void {
    this.router.navigateByUrl(`country/${data.extra}`);
  }


}


