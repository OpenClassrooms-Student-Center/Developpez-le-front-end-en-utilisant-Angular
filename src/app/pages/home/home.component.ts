import { Component, OnInit } from '@angular/core';
import { Chart, ChartData } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
  private countryLabels : string[]= [];
  private index = 0;

  public numberOfJos = 0;
  public numberOfCountries = 0;
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
      next: (country: Country[]) => {
        this.country = country;
        this.initializeBarChartData(this.country);
        // this.initializeBarChartOption();
        this.initializeNumberOfCountrie(this.country);
        this.initializeNumberOfJos(this.country);

      },
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
        data: this.getAllMedalsForEachCountry(country),
      }],
      labels: this.getAllLabelsForEachCountry(country),


    }
  }

  initializeBarChartOption(){
   this.barChartOptions = {
      responsive: true,
      // plugins: {
      //   // Change options for ALL labels of THIS CHART
      //   datalabels: {
      //     color: '#000',
      //     backgroundColor: 'white',
      //     anchor : 'end',
      //     padding: 4,
      //     formatter: () => {
      //       this.index === 5 ? this.index = 0 : this.index++;

      //       return this.countryLabels[this.index-1]
      //     }
      //   }
      // }

    };
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
  getAllLabelsForEachCountry(country: Country[]): string[] {
    this.countryLabels = [...country.map((country: Country) => country.country)]
    return this.countryLabels;
  }

  /**
   *
   * @param country
   */
  initializeNumberOfCountrie(country: Country[]): void {
    this.numberOfCountries = country.length;
  }

  /**
   *
   * @param country
   */
  initializeNumberOfJos(country: Country[]): void {
    let numberOfJo = 0;
    country.forEach((country: Country) => {
      if (country.participations.length > numberOfJo) {
        numberOfJo = country.participations.length
      }
    })

    this.numberOfJos = numberOfJo;
  }

}
