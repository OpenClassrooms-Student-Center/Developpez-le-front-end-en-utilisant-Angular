import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { Country } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import 'chartjs-plugin-piechart-outlabels';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  private country: Country[] = [];
  private countryLabels : string[]= [];
  private countryColors = ['#793d52', '#89a1db', '#9780a1', '#bfe0f1', '#b8cbe7', '#956065']
  private ctx : any;
  @ViewChild('chartRef') myChartRef : ElementRef | undefined;
  private myChart : Chart | undefined;

  public numberOfJos = 0;
  public numberOfCountries = 0;
  public error: Error | undefined;

  constructor(private olympicService: OlympicService) {

   }
  ngAfterViewInit(): void {
    this.getAllCountrysAndInitializeGraph();
  }

  initializeChart(country : Country[]){
    this.ctx = this.myChartRef?.nativeElement.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'outlabeledPie',
      data: this.initializeBarChartData(country),
      options: this.initializeBarChartOption(),
    });

  }

  /**
   * get countrys with their datas and launch method that initialize barChartData and barChartOptions
   */
  getAllCountrysAndInitializeGraph(): void {
    this.olympicService.getOlympics().subscribe({
      next: (country: Country[]) => {
        this.country = country;
        this.initializeNumberOfCountrie(this.country);
        this.initializeNumberOfJos(this.country);
        this.initializeChart(country)

      },
      error: (error: Error) => this.error = error
    })

  }

  /**
   *
   * @param country
   */
  initializeBarChartData(country: Country[]) : ChartData {
    return {
      labels: this.getAllLabelsForEachCountry(country),
      datasets: [
        {
          backgroundColor: this.countryColors,
          data: this.getAllMedalsForEachCountry(country),
        },
      ],
    }
  }

  /**
   *
   * @returns
   */
  initializeBarChartOption() : ChartOptions{
    return {
      responsive : true,
      plugins: {
        legend: false,
        outlabels: {
          backgroundColor: 'transparent',
          text: '🏅%l',
          color: 'black',
          stretch: 35,
          font: {
            resizable: true,
            minSize: 12,
            maxSize: 18,
          },
        },
      },
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
