import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, pipe, Subscription} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { catchError, map, tap, mergeMap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Olympic } from 'src/app/core/models/Olympic';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {


  // public olympics$ = new Observable<{ name: string; value: number }[]>;
  public olympicData!:{ "name": string; "value": number }[];
  public subscription!: Subscription;
  public subscription2!: Subscription;
  public subscription3!: Subscription;
  public numberOfJos!: number;
  public numberOfCountries!: number;
  public olympics$!: Observable<Olympic[]>;


  public view: any = [700, 400];
  public colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;



  constructor(private olympicService: OlympicService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.olympicService.getOlympics().subscribe(
      countriesData => {
        this.numberOfCountries = countriesData?.length;
        this.numberOfJos = countriesData?.[0].participations.length

        this.olympicData = [];
        countriesData.forEach((country) => {
          this.olympicData.push(
            {
              name: country.country,
              value: country.participations.reduce((totalMedals, participation) => totalMedals + participation.medalsCount, 0)
            }
          )
        })
      },
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

    onActivate(data: any): void {
      console.log('Activate', JSON.parse(JSON.stringify(data)));
      console.log(`data activate : ${data}`)
    }

    onDeactivate(data: any): void {
      console.log('Deactivate', JSON.parse(JSON.stringify(data)));
      console.log(`data ondeactivate : ${data}`)
    }

    onSelect(data: {name: string, value: number}): void {
      console.log('Item clicked', JSON.parse(JSON.stringify(data)));
      console.log(`data onselect : ${data}`);

      const olympicCountry = data.name;
      this.router.navigateByUrl(`/${olympicCountry}`);
    }

  }
