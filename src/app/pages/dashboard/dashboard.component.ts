import { Component, OnInit } from '@angular/core';
import { Observable, concatWith, of} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  ngxChartsData: Object[] = [];

  // ngx-charts options
  view: [number,number] = [700, 400];
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  trimLabels: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#C7B42C']
  };


  constructor(
    private olympicService: OlympicService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.subscribe((value) => { 
      this.ngxChartsData = this.CreateDataToNgxCharts(value)
    })
  }

  CreateDataToNgxCharts(data: any): Object[] {
    for (let index in data) {
      let medalsTotal: Number = data[index].participations.reduce(
        (sum: any, val: any) => {
            sum += val.medalsCount;
            return sum;
        }, 0);
      let formatedData = {
        "extra": data[index].id,
        "name": data[index].country, 
        "value": medalsTotal
      }
      this.ngxChartsData.push(formatedData)
      }
      return [...this.ngxChartsData]
  }

  onSelect(data: any): void {
    console.log(data.extra)

    this.router.navigateByUrl(`detail/${data.extra}`);
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}