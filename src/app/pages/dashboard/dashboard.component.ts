import { Component, OnInit } from '@angular/core';
import { Observable, concatWith, of, pipe, map, find } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import { Country } from 'src/app/core/models/Country';
import { Participation } from 'src/app/core/models/Participation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ngxChartsData!: Array<object>;
  numberOfOlympics!: number;
  numberOfCountries!: Observable<Array<object>>;

  // ngx-charts options
  gradient: boolean = true;
  showLabels: boolean = true;
  trimLabels: boolean = false;
  tooltipDisabled: boolean = true;

  // TODO MR Generate auto color ajouter dans une session pour envoyer  
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#C7B42C']
  };

  constructor(
    private olympicService: OlympicService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.olympicService.getOlympics().pipe(
      map((value) => {
        if (typeof value === 'object') {
          this.ngxChartsData = this.createDataToNgxChartss(value)
          this.numberOfOlympics = this.getNumberOfOlympics(value)
        }
      })
    ).subscribe()
    this.numberOfCountries = this.olympicService.getOlympics();
  }

  getNumberOfOlympics(data: []): number {
    let country: Country = Object.values(data)[0];
    return country != undefined ? 
      country.participations.length : 0 ;
  };

  createDataToNgxChartss(data: []): Object[] {
    let chartsData: Array<object> = [];
    data.find((val: Country) => {
      chartsData.push(
        {
          "extra": val.id,
          "name": val.country,
          "value": val.participations.reduce(
            (sum: number, val: Participation) => {
              sum += val.medalsCount;
              return sum;
            }, 0)
        }
      )
    })
    return [...chartsData];
  }

  onSelect(data: {extra: number}): void {
    this.router.navigateByUrl(`detail/${data.extra}`);
  }
}