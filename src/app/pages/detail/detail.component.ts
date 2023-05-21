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




  view: any = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Medals';
  timeline: boolean = true;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
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
          console.log('Olympic found dans le if:', olympicFound);
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
