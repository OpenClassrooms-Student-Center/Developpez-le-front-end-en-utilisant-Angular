import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Subscription, Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-olympic-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  public subscription: Subscription = new Subscription();
  public olympicData!: {"name": string, "series": {"name": string, "value": number}[]} [];
  public series: {"name": string, "value": number}[]  = [];
  public nameOfCountry!: string;
  public numberOfAthletes!: number;
  public numberOfMedals!: number;
  public numberOfEntries!: number;

  // Line chart configuration
  view: [number, number] = [400, 300];
  colorScheme: Color = {
    name: 'myColorScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5F264A', '#850E35', '#a48da6', '#93BFCF']
  };

  // Line chart options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Medals';
  timeline: boolean = true;

  constructor(private olympicService: OlympicService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {

    const olympicCountry = this.route.snapshot.params['name'];

    this.subscription = this.olympicService.getOlympics().subscribe(
      olympics => {

        // To find olympic by country name compared on the Url
        const olympicFound = olympics.find((olympic) => olympic.country === olympicCountry)

        if (olympicFound !== undefined) {

          // title with name of the country
          this.nameOfCountry = olympicFound.country;
          //Total number of athletes
          this.numberOfAthletes = olympicFound.participations.reduce((totalAthletes, participation) => totalAthletes + participation.athleteCount, 0);
          // Total number of medals
          this.numberOfMedals = olympicFound.participations.reduce((totalMedals, participation) => totalMedals + participation.medalsCount, 0)
          // Total number of entries
          this.numberOfEntries = olympicFound.participations.length

          //line Chart data
          this.series = [];

          olympicFound.participations.forEach((participation) => {
            this.series.push(
              {
              name: participation.year.toString(),
              value: participation.medalsCount,
              }
            );
          });

          this.olympicData = [{
            name: olympicFound.country,
            series: this.series
          }];

        } else {
          // To redirect in the previous page (homeComponent)
          this.router.navigateByUrl(`/${olympicCountry}/not-found`)
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onSelect(data: {"name": string, "series": {"name": string, "value": number}[]} []): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: {"name": string, "series": {"name": string, "value": number}[]} []): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: {"name": string, "series": {"name": string, "value": number}[]} []): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
