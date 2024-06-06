import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { Observable, of } from 'rxjs';
import { Country } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private country: Country[] = [];
  public barChartData: ChartData<"pie", number[]> | undefined;


  public barChartOptions = {

  }
  public error: Error | undefined;

  constructor(private olympicService: OlympicService) { }

  ngOnInit(): void {
    this.getAllCountrysAndInitializeGraph();
  }

  /**
   * get countrys with their datas and launch method that initialize barChartData and barChartOptions
   */
  getAllCountrysAndInitializeGraph(): void {
    this.olympicService.getOlympics().subscribe({
      next: (country: Country[]) => { this.country = country; this.initializeBarChartData(this.country) },
      error: (error: Error) => this.error = error
    })

  }

  /**
   *
   * @param country
   */
  initializeBarChartData(country: Country[]) {
    this.barChartData = {
      datasets: [{
        data: this.getAllMedalsForEachCountry(country)
      }],
      labels: this.getAllLabelsForEachCountry(country)
    }
  }

  /**
   *
   * @param country
   * @returns an array that contains the sum of each medals per participation of each country
   */
  getAllMedalsForEachCountry(country: Country[]): number[] {
    return [...country
      .map((oneCountry: Country) => oneCountry.participations
        .map((participation: Participation) => participation.medalsCount)
        .reduce((acc, currentValue) => acc + currentValue))]
  }

  /**
   *
   * @param country
   * @returns an array that contains all country labels
   */
  getAllLabelsForEachCountry(country : Country[]) : string[]{
    return [...country.map((country : Country) => country.country)]
  }
}
