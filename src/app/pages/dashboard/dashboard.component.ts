import { Component, OnInit } from '@angular/core';
import { Observable, concatWith, of, pipe, map, find } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import { Country } from 'src/app/core/models/Country';
import { Participation } from 'src/app/core/models/Participation';
import {
  floor, number, random
} from 'mathjs'
import { type } from 'ngx-bootstrap-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ngxChartsData!: Array<object>;
  numberOfOlympics!: number;
  totalMedalsPerCountry: number | string = ''
  numberOfCountries!: Observable<Array<object>>;

  // ngx-charts options
  gradient: boolean = true;
  showLabels: boolean = true;
  trimLabels: boolean = false;
  tooltipDisabled: boolean = true;
  colorScheme: Record<string, Array<string>> = {domain: []};

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
          this.generateColors(value)
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
    let color: string = '#5AA454'
    for (let idx in this.ngxChartsData) {
      let dataNgx: { extra?: number } = this.ngxChartsData[idx];
      if (dataNgx.extra == data.extra) {
        color = this.colorScheme['domain'][idx];
      }
    }
    sessionStorage.setItem('colorItem', color);
    this.router.navigateByUrl(`detail/${data.extra}`);
  }

  onActivate(data: {value: {value: number}}): void {
    this.totalMedalsPerCountry = data.value.value
  }

  onDeactivate(data: {extra: number}): void {
    this.totalMedalsPerCountry = ''
  }

  generateColors(data: Array<object>) {
    let domain: Array<string> = [];
    data.forEach(function (value) {
      domain.push(
        `#${floor(random()*16777215).toString(16)}`
        )
    });
    this.colorScheme['domain'] = domain
  }
}