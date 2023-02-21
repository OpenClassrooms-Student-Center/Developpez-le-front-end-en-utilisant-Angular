import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
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

  joCount: number = 0;

  countryCount: number = 0;

  countryList: string[] = [];

  olympicSubscription!: Subscription;

  dataChart : {"name": string, "value": number, "extra": number}[] = [];

  constructor(private olympicService: OlympicService,
              private router: Router) {}

  ngOnInit(): void {

    this.olympicSubscription = this.olympicService.getOlympics().subscribe(
      {
        next: (olympics: Olympic[]) => {

          const medalsPerCountry: number[] = [];
          this.joCount =  this.getJOsCount(olympics);
          this.countryList = this.getCountryList(olympics);
          this.countryCount = this.countryList.length;
          this.dataChart = this.getDataChart(olympics);
          },
          error: err => console.error('An error occurend', err),
          complete: () => console.log('Completed')
      }
    )
  }

  ngOnDestroy(): void {
    this.olympicSubscription.unsubscribe();
  }

  private getDataChart(olympics: Olympic[]): {"name": string, "value": number, "extra": number}[] {
    const data = olympics.map((olympic) => {
      return {
        name: olympic.country,
        value: this.getMedalsCount(olympic.participations),
        extra: olympic.id,
      } });

    return data;

  }

  private getCountryList(olympics: Olympic[]): string[] {
    const countryList = olympics.map((olympic) => olympic.country);
    // return list of countries
    return countryList;
}

  private getJOsCount(olympics: Olympic[]): number {
      const yearsJO = olympics.flatMap((olympic) => olympic.participations.map((participation) => participation.year));
      // yearsJO contains duplicate, remove duplicate
      const yearsJOFiltered = yearsJO.filter((item, index) => yearsJO.indexOf(item) === index);

      // return count of unique JOs year
      return yearsJOFiltered.length;
  }

  private getMedalsCount(participations: Participation[]): number {
      return participations.filter(value => value.medalsCount !== 0).reduce((previousValue, currentValue) => previousValue + currentValue.medalsCount, 0);

  }

  private getAthleteCount(participations: Participation[]): number {
    return participations.filter(value => value.athleteCount !== 0).reduce((previousValue, currentValue) => previousValue + currentValue.athleteCount, 0);

  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.router.navigateByUrl(`country/${data.extra}`);
  }

}


