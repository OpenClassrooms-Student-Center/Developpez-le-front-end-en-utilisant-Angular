import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {Olympic} from "../../core/models/Olympic";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of();
  public olympicsData: Olympic[] = [];
  public numberOfCountries: number = 0;
  public numberOfJOs: number = 0;
  public dataByCountry: { name: string, value: number }[] = [];
  public finalData: any[] = [];

  constructor(private olympicService: OlympicService) {
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.getOlympicsData();
  }

  public getOlympicsData(): void {
    const subscription = this.olympics$.subscribe({
      next: value => {
        if (value !== null) {
          this.finalData = value;
          for (let country of this.finalData) {
            this.olympicsData.push(new Olympic(country["id"], country["country"], country["participations"]));
          }
          this.numberOfCountries = this.olympicsData.length;
          this.getDataOfCountry();
          this.getNumberOfJOs();
        }
      },
      error: err => console.error(err),
      complete: () => {
        subscription.unsubscribe();
      }
    });
  }

  public getNumberOfJOs(): void {
    for (let country of this.olympicsData) {
      this.numberOfJOs = country.participations.length;
    }
  }

  public getDataOfCountry(): any {
    this.dataByCountry = [];
    for (let country of this.olympicsData) {
      let countryMedals = 0;
      for (let jo of country.participations) {
        countryMedals += jo.medalsCount;
      }
      this.dataByCountry.push({name: country.country, value: countryMedals});
    }
  }
}
