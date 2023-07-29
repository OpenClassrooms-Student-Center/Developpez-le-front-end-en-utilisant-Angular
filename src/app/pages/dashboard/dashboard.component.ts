import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import { Country, Participation } from 'src/app/core/models/olympic';
import { ChartsPie } from 'src/app/core/models/charts';
import { floor, random } from 'mathjs'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  numberOfOlympics!: number;
  totalMedalsPerCountry: number | undefined;
  olympics$!: Observable<Array<Country>>;
  // ngx-charts options
  ngxChartsData!: Array<ChartsPie>;
  gradient: boolean = true;
  showLabels: boolean = true;
  trimLabels: boolean = false;
  tooltipDisabled: boolean = true;
  colorScheme: {domain: Array<string>} = {domain: []};

  constructor(
    private olympicService: OlympicService,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.olympics$ = this.olympicService.getOlympics()
      this.olympics$.pipe(
      map((value) => {
        if (typeof value === 'object') {
          this.ngxChartsData = this.createDataToNgxCharts(value);
          this.numberOfOlympics = this.getNumberOfOlympics(value);
          this.colorScheme['domain'] = this.getListColor(value);
        }
      })
    ).subscribe();
  }

  /* 
  * Create formated object to use it in ngx-charts
  */
  createDataToNgxCharts(data: Array<Country>): Array<ChartsPie> {
    let chartsData: Array<ChartsPie> = [];
    data.find((val: Country) => {
      chartsData.push({
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
    return chartsData;
  }

  /* 
  * get number of olympics to show in page
  */
  getNumberOfOlympics(data: Array<Country>): number {
    let country: Country = Object.values(data)[0];
    return country != undefined ? 
      country.participations.length : 0 ;
  };

  /*
  * Used to navigate to page detail when country is clicked on
  * charts, also used to store color to use the same in detail page 
  */
  onSelectCountry(data: ChartsPie): void {
    let color: string = ""
    for (let idx in this.ngxChartsData) {
      let dataNgx: { extra?: number } = this.ngxChartsData[idx];
      if (dataNgx.extra == data.extra) {
        color = this.colorScheme['domain'][idx];
      }
    }
    color !== "" 
      ? sessionStorage.setItem('colorItem', color) 
      : sessionStorage.setItem('colorItem', '#5AA454');
    this.router.navigateByUrl(`detail/${data.extra}`);
  }

  /*
  * Change name of country on title when hover
  */
  onActivate(data: {value: ChartsPie}): void {
    this.totalMedalsPerCountry = data.value.value;
  }

  /*
  * Delete name country on title when no element is hovered
  */
  onDeactivate(data: ChartsPie): void {
    this.totalMedalsPerCountry = undefined;
  }

  /*
  * Get color from session storage or function generate
  */
  getListColor(data: Array<Country>): Array<string> { 
    let listColor: string | null = sessionStorage.getItem('listColor')
    
    if (listColor != null) {
      return JSON.parse(listColor)
    } 
    
    return this.generateColors(data);
  }

  /*
  * Dynamic generation color to charts Pie
  */
  generateColors(data: Array<Country>): Array<string> {
    let domain: Array<string> = [];
    data.forEach(function (value) {
      domain.push(
        `#${floor(random()*16777215)
          .toString(16)
          .padStart(6, '0')}` // in case the number is too small to fill 6 hex digits
        )
    });
    sessionStorage.setItem(
      'listColor', JSON.stringify(domain)
      );
    return domain;
  }
}