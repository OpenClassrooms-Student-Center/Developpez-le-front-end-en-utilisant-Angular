import { Participation } from 'src/app/core/models/Participation';
import { Subscription } from 'rxjs';
import { OlympicService } from './../../core/services/olympic.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Olympic } from 'src/app/core/models/Olympic';


@Component({
  selector: 'app-country-data',
  templateUrl: './country-data.component.html',
  styleUrls: ['./country-data.component.css']
})
export class CountryDataComponent implements OnInit {

  countryId!: number;
  countryName!: string;
  countryEntries!: number;
  countryMedalsCount!: number;
  countryAthletesCount!: number;
  countryJoYears!: number[];
  countryMedalsPerJo!: number[];

  countryDataSubscription!: Subscription;

  seriesChart : any[] = [];
  data : any[] = [];
  view: any[] = [700, 300];
  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Medals';
  timeline: boolean = false;



  constructor(private OlympicService: OlympicService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {


    this.countryId = +(this.route.snapshot.params['id']);
    this.countryMedalsCount = 0;
    this.countryAthletesCount = 0;
    this.countryJoYears = [];
    this.countryMedalsPerJo = [];

    this.countryDataSubscription = this.OlympicService.getOlympicByCountryId({ countryId: this.countryId }).subscribe(
      {
        next: (Olympic) => {
          this.countryName = String(Olympic?.country);
          this.countryEntries = Number(Olympic?.participations.length);

          Olympic?.participations.forEach(participation => {
                          this.countryMedalsCount += participation.medalsCount;
                          this.countryAthletesCount += participation.athleteCount

                          this.countryJoYears.push(participation.year);
                          this.countryMedalsPerJo.push(participation.medalsCount);

                          let serie =  {"name": participation.year, "value": participation.medalsCount};
                          this.seriesChart.push(serie);

                        } )
          // push doesn't refresh chart data, this line needed to force this.single to be actualised
          this.data = [{ "name": this.countryName, "series": this.seriesChart }];
         // this.data = [this.getDataChart(Olympic)];
        },
          error: err => console.error('An error occurend', err),
          complete: () => console.log('Completed')
      }
    )
  }

  private getDataChart(olympic: Olympic): {"name": string, "series": {"name": string, "value": number }[]} {
    return {
        "name": olympic.country,
        "series": olympic.participations.map((participation: Participation) => {
          return {
            name: String(participation.year),
            value: participation.medalsCount,
          } }),
      };

    }

  private getMedalsCount(participations: Participation[]): number {
      return participations.filter(value => value.medalsCount !== 0).reduce((previousValue, currentValue) => previousValue + currentValue.medalsCount, 0);

  }

  private getAthleteCount(participations: Participation[]): number {
    return participations.filter(value => value.athleteCount !== 0).reduce((previousValue, currentValue) => previousValue + currentValue.athleteCount, 0);

  }


  ngOnDestroy(): void {
    this.countryDataSubscription.unsubscribe();
  }

  onContinue(): void {
    this.router.navigateByUrl('');
  }


}
