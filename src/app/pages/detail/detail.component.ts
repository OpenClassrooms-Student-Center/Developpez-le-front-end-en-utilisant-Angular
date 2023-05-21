import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, of,throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { multi } from '../home/data';

@Component({
  selector: 'app-olympic-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {


  public olympic$!: Observable<Olympic>;
  public subscription: Subscription = new Subscription();
  public olympicData!: {"name": string, "series": {"name": string, "value": number}[]} [];
  public series: {"name": string, "value": number}[]  = [];
  public nameOfCountry!: string;
  public numberOfAthletes!: number;
  public numberOfMedals!: number;
  public numberOfEntries!: number;




  view: any = [750, 350];

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
  timeline: boolean = true;

  colorScheme: any = {
    domain: ['#5F264A','#850E35', '#a48da6','#93BFCF' ]
  };

  constructor(private olympicService: OlympicService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {

    const olympicCountry = this.route.snapshot.params['name'];
    console.log('Olympic Country:', olympicCountry);

    this.subscription = this.olympicService.getOlympics().subscribe(
      olympics => {


        const olympicFound = olympics.find((olympic) => olympic.country === olympicCountry)
        console.log('Olympic found dans avant le if:', olympicFound);


        if (olympicFound !== undefined) {
          // title with name of country
          this.nameOfCountry = olympicFound.country;
          //Total number of athletes
          this.numberOfAthletes = olympicFound.participations.reduce((totalAthletes, participation) => totalAthletes + participation.athleteCount, 0);
          // Total number of medals
          this.numberOfMedals = olympicFound.participations.reduce((totalMedals, participation) => totalMedals + participation.medalsCount, 0)
          // Total number of entries
          this.numberOfEntries = olympicFound.participations.length

          //line Chart
           this.series = [];

            olympicFound.participations.forEach((participation) => {
              this.series.push(
                {
                name: participation.year.toString(),
                value: participation.medalsCount,
                }
              );
              console.log('series:', this.series)
            });

            this.olympicData = [{
            name: olympicFound.country,
            series: this.series
            }];

            console.log('fin du if, données finales: ',this.olympicData)

        } else {
          this.router.navigateByUrl(`/${olympicCountry}/not-found`)
          console.log(`Olympic ${olympicFound} is not found`);
        }


      }
    )
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


}
