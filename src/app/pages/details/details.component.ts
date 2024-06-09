import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import * as Chart from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import { Country } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { FindedCountry } from 'src/app/core/models/FindedCountry';
import { Observable, Subscription, map, mergeMap, tap } from 'rxjs';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly color = '#04838f';

  private currentCountry: Country | undefined;
  private ctx: any;
  private myChart: Chart | undefined;
  private allSubscription : Subscription = new Subscription();

  @ViewChild('chartRef') myChartRef: ElementRef | undefined;
  @ViewChild('nameCountry') nameCountryRef!: ElementRef;


  public error: Error | undefined;
  public nameOfCountry: string | undefined;
  public entriesNumber: number | undefined;
  public medalsNumber: number | undefined;
  public athletesNumber: number | undefined;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute,  private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.allSubscription.add(this.getTheGoodCountryAndInitializeGraph().subscribe(
      {
      next : (oneCountry: Country | undefined) => {
      if(oneCountry){
        this.initializeChart(oneCountry);
        this.cdRef.detectChanges();
      }else{
        this.checkErrorOfGetCountry()
        this.cdRef.detectChanges();

      }},
      error : () => {
        this.checkErrorOfGetCountry()
        this.cdRef.detectChanges();

      }
    }))
  }



  /**
   *
   * @param country
   */
  initializeChart(oneCountry: Country) {
    this.ctx = this.myChartRef?.nativeElement.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'line',
      data: this.initializeBarChartData(oneCountry),
      options: this.initializeBarChartOption(),
    });
  }


  /**
  * get country with its datas and launch method that initialize barChartData and barChartOptions
  */
  getTheGoodCountryAndInitializeGraph(): Observable<Country | undefined> {
    return this.olympicService.getOlympics().pipe(
      mergeMap((country: Country[]) => this.route.queryParams.pipe(
        map((urlCoutry: Params) => this.currentCountry = country.find((oneCountry: Country) => oneCountry.country === (urlCoutry as FindedCountry).country)),
        tap((country : Country | undefined) => {
          if(country){
            this.nameOfCountry = country.country;
            this.nameCountryRef.nativeElement.style.backgroundColor = this.color;
           this.entriesNumber = this.initializeNumberOfEntriesProperties(country);
           this.athletesNumber = this.initializeNumberOfAthletesProperties(country);
           this.medalsNumber = this.initializeNumberOfMedalProperties(country);
          }
        })
      )
      )
    )

  }

  /**
   *
   * @param country
   */
  initializeBarChartData(oneCountry: Country): ChartData {
    return {
      labels: this.getAllLabelsCountry(oneCountry),
      datasets: [
        { fill : false,
          data: this.getAllMedalsForCurrentCountry(oneCountry),
          borderColor: this.color,
        },
      ],
    }
  }

  /**
   *
   * @returns
   */
  initializeBarChartOption(): ChartOptions {
    return {
      responsive: true,
      plugins: {
        legend: false,

      },

    }
  }


  /**
  *
  * @param country
  * @returns an array that contains the sum of each medals per participation of each country
  */
  getAllMedalsForCurrentCountry(currentCountry: Country): number[] {
    return currentCountry.participations.length > 0 ?
    [...currentCountry.participations.map((participation : Participation) => participation.medalsCount)] : []
  }

  /**
   *
   * @param country
   * @returns an array that contains all currentCountry labels
   */
  getAllLabelsCountry(currentCountry: Country): string[] {
   return currentCountry.participations.length > 0 ? [...currentCountry.participations.map((participation : Participation) => participation.year.toString())] : []
  }

  initializeNumberOfEntriesProperties(currentCountry : Country){
    return currentCountry.participations.length
  }

  initializeNumberOfMedalProperties(currentCountry : Country){
    return currentCountry.participations.map((participation) =>participation.medalsCount).reduce((a, b) => a + b,0)
  }

  initializeNumberOfAthletesProperties(currentCountry : Country){
    return currentCountry.participations.map((participation) =>participation.athleteCount).reduce((a, b) => a + b,0)

  }

  checkErrorOfGetCountry(){
    this.nameOfCountry = "Malheureusement Aucun Pays n'a pas être trouvé"
    this.nameCountryRef.nativeElement.style.backgroundColor = 'red';
  }


  ngOnDestroy(): void {
    this.allSubscription.unsubscribe();
  }



}
