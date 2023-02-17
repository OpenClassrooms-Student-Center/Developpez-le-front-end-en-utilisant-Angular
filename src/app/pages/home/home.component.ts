import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
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
  countryCount!: number;

  countryList!: string[];

  medalsPerCountry!: number[];

  olympicSubscription!: Subscription;

  public olympics$: Observable<Olympic[]> = of([]);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

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
          });
          this.countryCount = countryList.length;
          this.countryList = countryList;
          this.medalsPerCountry = medalsPerCountry;
          },
          error: err => console.error('An error occurend', err),
          complete: () => console.log('Completed')
      }
  )



    // TODO implement method to get joCount
   // this.joCount = this.getJoCount();
    // TODO implment methodo to get countryCount
   // this.countryCount = this.getCountryCount();
  }

  ngOnDestroy(): void {
    this.olympicSubscription.unsubscribe();
  }

  private getJoCount(): number {
    // TODO

    return 10;
  }

  private getCountryCount(): number {
    // TODO
    const countryCount = 6;
    return countryCount;
  }

  public getMedalsCount(participations: Participation[]): number {
      return participations.filter(value => value.medalsCount !== 0).reduce((previousValue, currentValue) => previousValue + currentValue.medalsCount, 0);

  }

  public getAthleteCount(participations: Participation[]): number {
    return participations.filter(value => value.athleteCount !== 0).reduce((previousValue, currentValue) => previousValue + currentValue.athleteCount, 0);

  }


}
