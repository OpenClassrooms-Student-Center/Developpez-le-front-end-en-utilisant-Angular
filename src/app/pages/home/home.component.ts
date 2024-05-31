import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);

  constructor(private olympicService: OlympicService) {}

  

  public medalsPerCountry = this.olympicService.getMedalsPerCountry();

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  public pieChartData!: ChartDataset<"pie", number[]>[];
  public pieChartLabels: string[] = [];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.medalsPerCountry = this.olympicService.getMedalsPerCountry();

    console.log("MedalsPerCountry : ")
    console.log(this.medalsPerCountry);


    this.medalsPerCountry.forEach((country) =>
      this.pieChartLabels.push(country.country)
    );

    console.log("pieChartLabels : " )
    console.log(this.pieChartLabels);

    this.pieChartData = [
      {
        data: this.medalsPerCountry.map((country) => country.medalsCount)
        .filter((value): value is number => value !== undefined)
      }
    ];

    console.log(this.pieChartData);
  }

}
