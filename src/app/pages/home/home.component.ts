import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

export const CHART_TYPE:ChartType = 'doughnut';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  private _countries:string[] = [];
  private _medalsPerCountry: number[] = [];
  public pieChartType: ChartType = CHART_TYPE;
  public pieChartPlugins = [ DatalabelsPlugin ];
  public pieChartData: ChartData<ChartType, number[], string | string[]> | undefined = undefined;
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };

  public olympics$: Observable<Olympic[]> = of([]);
  public olympics: Olympic[] = [];
  public dataLoaded:boolean = false;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((data)=> {
      this.olympics = data;
      this.olympics.forEach((olympic)=> { 
        this._countries.push(olympic.country);
        let medalsCount:number = 0;
        olympic.participations.forEach((participation) => {
          medalsCount += participation.medalsCount;
        });
        this._medalsPerCountry.push(medalsCount);
      });
      this.pieChartData = {
        labels: this._countries,
        datasets: [ {
          data: this._medalsPerCountry
        } ]
      }
      this.dataLoaded = true;
    });
  }
}
