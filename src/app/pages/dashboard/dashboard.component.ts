import { Component, OnInit } from '@angular/core';
import { Observable, concatWith, of, pipe, map } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  ngxChartsData: Object[] = [];
  numberOfOlympics!: number;
  public numberOfCountries: Observable<any> = of(null)

  // ngx-charts options
  gradient: boolean = true;
  showLabels: boolean = true;
  trimLabels: boolean = false;
  tooltipDisabled: boolean = true;

  // TODO MR Generate auto color 
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

  getNumberOfOlympics(data: any): number {
    return data.find(
      (val: any) => val !== undefined
    ).participations.length;
  };

  createDataToNgxChartss(data: any): Object[] {
    data.find((val: any) => {
      this.ngxChartsData.push(
        {
          "extra": val.id,
          "name": val.country,
          "value": val.participations.reduce(
            (sum: any, val: any) => {
              sum += val.medalsCount;
              return sum;
            }, 0)
        }
      )
    })
    return [...this.ngxChartsData];
  }

  onSelect(data: any): void {
    this.router.navigateByUrl(`detail/${data.extra}`);
  }
}