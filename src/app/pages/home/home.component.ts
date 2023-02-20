import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  joCount: number = 0;
  countryCount!: number;

  countryList!: string[];

  medalsPerCountry!: number[];

  olympicSubscription!: Subscription;

  public olympics$: Observable<Olympic[]> = of([]);

  single : any[] = [];

  constructor(private olympicService: OlympicService,
              private router: Router) {}

  ngOnInit(): void {

    // vowels$.subscribe({
    //   next: x => console.log('The next vowel is: ', x),
    //   error: err => console.error('An error occurred', err),
    //   complete: () => console.log('There are no more vowels.')
    // });
    this.olympicSubscription = this.olympicService.getOlympics().subscribe(
      {
        next: (olympics: Olympic[]) => {
          const countryList: string[] = [];
          const medalsPerCountry: number[] = [];

          olympics.forEach(olympicItem => {
            countryList.push(olympicItem.country);
            medalsPerCountry.push(this.getMedalsCount(olympicItem.participations));
            // get JO count by having the max participations number from a country...
            // to improve
            if (this.joCount <= olympicItem.participations.length) {
              this.joCount = olympicItem.participations.length;
            }
            // use the extra chart-property to store the countryId value, id needed for accessing country-data page.
            let infoChart =  {"name": olympicItem.country, "value": this.getMedalsCount(olympicItem.participations), "extra": olympicItem.id};
            this.single.push(infoChart);
          });
          this.countryCount = countryList.length;
          this.countryList = countryList;
          this.medalsPerCountry = medalsPerCountry;
          // push doesn't refresh chart data, this line needed to force this.single to be actualised
          this.single = [...this.single];
          },
          error: err => console.error('An error occurend', err),
          complete: () => console.log('Completed')
      }
  )
  }

  ngOnDestroy(): void {
    this.olympicSubscription.unsubscribe();
  }

  public getMedalsCount(participations: Participation[]): number {
      return participations.filter(value => value.medalsCount !== 0).reduce((previousValue, currentValue) => previousValue + currentValue.medalsCount, 0);

  }

  public getAthleteCount(participations: Participation[]): number {
    return participations.filter(value => value.athleteCount !== 0).reduce((previousValue, currentValue) => previousValue + currentValue.athleteCount, 0);

  }

  labelFormat(labelName: string): string{
    return labelName.toUpperCase();
}

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.router.navigateByUrl(`country/${data.extra}`);
  }

}
