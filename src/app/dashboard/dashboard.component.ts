import {Component, OnInit, ViewChild} from '@angular/core';
import {OlympicData, Participations} from "../models/olympic-data.model";
import {DataService} from "../services/olympic-data.service";
import {ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from "ng-apexcharts";
import {Router} from "@angular/router";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  olympicData!: OlympicData[]
  public nbJO!: number;
  public nbCountry!: number;

  // Pie
  public pieChartOptions: {} = {};
  public pieChartLabels!: string[];
  public pieChartDatasets!: {data: number[]}[];
  public pieChartLegend: boolean = true;
  public pieChartPlugins: [] = [];

  constructor(private dataService: DataService,
              private router: Router) { }

  public onChartClick(event: any): void {
    if (event.active && event.active.length > 0 && 'index' in event.active[0]) {
      const index: number = event.active[0]['index'];
      const countryClicked: string = this.pieChartLabels[index];
      this.router.navigate(['/details', countryClicked]);
    }
  }



  ngOnInit(): void {
    this.dataService.getData().subscribe((data: OlympicData[]): void => {
      this.olympicData = data;

      this.nbCountry = this.olympicData.length;

      const allYears: number[] = [];
      this.olympicData.forEach(data  => {
        data.participations.forEach(participation  => {
          allYears.push(participation.year);
        });
      });
      const uniqueYears: Set<number> = new Set(allYears);
      this.nbJO = uniqueYears.size;

      this.pieChartLabels = [];
      const pieChartData: number[] = [];

      this.olympicData.forEach((data: OlympicData) : void => {
        this.pieChartLabels.push(data.country);

        const totalMedalsForCountry : number = data.participations.reduce(
          (acc : number, participation : Participations) => acc + participation.medalsCount, 0);
        pieChartData.push(totalMedalsForCountry);
      });

      this.pieChartDatasets = [{ data: pieChartData }];
    });
  }

  protected readonly event = event;
}
