import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {OlympicService} from "../../core/services/olympic.service";
import {Observable, of} from "rxjs";
import {Olympic} from "../../core/models/Olympic";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  country!: string;
  public olympics$: Observable<Olympic[]> = of();
  countryData: Olympic[] = [];
  public dataChart: any[] = [];

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.country = params['country'];
    });

    this.olympics$ = this.olympicService.getOlympics();
    const subscription = this.olympics$.subscribe({
      next: value => {
        for (let country of value) {
          if (country["country"] === this.country) {
            this.countryData.push(new Olympic(country["id"], country["country"], country["participations"]));
          }
        }
        this.dataChart = this.setFormatForChart();
      },
      error: err => console.error(err),
      complete: () => {
        subscription.unsubscribe();
      }
    });
  }

  getNumberOfJOs(): number {
    let numberOfJOs = 0;
    for (let country of this.countryData) {
      numberOfJOs = country.participations.length;
    }
    return numberOfJOs;
  }

  getNumberOfMedals(): number {
    let numberOfMedals = 0;
    for (let country of this.countryData) {
      for (let jo of country.participations) {
        numberOfMedals += jo.medalsCount;
      }
    }
    return numberOfMedals;
  }

  getNumberOfAthletes(): number {
    let numberOfAthletes = 0;
    for (let country of this.countryData) {
      for (let jo of country.participations) {
        numberOfAthletes += jo.athleteCount;
      }
    }
    return numberOfAthletes;
  }

  // @ts-ignore
  setFormatForChart(): any[] {
    let data: [{ name: string, series: [{ name: string, value: number }] }][] = [];
    let series: { name: string, value: number }[] = [];
    for (let i of this.countryData) {
      for (let tmp of i.participations) {
        series.push({name: tmp.year.toString(), value: tmp.medalsCount});
      }
      // @ts-ignore
      data.push([{name: this.country, series: series}]);
      return data[0];
    }
  }


}
