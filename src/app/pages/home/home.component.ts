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
  public olympics$: Observable<any> = of(null);
  public olympicsData: Olympic[] = [];
  public numberOfCountries: number = 0;
  public numberOfJOs: number = 0;
  public dataByCountry: { name: string, value: number }[] = [];
  data = [
    {name: "Mobiles", value: 105000},
    {name: "Laptop", value: 55000},
    {name: "AC", value: 15000},
    {name: "Headset", value: 150000},
    {name: "Fridge", value: 20000}
  ];

  constructor(private olympicService: OlympicService) {
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();


    this.olympics$.subscribe((olympics) => {
        for (let country of olympics) {
          let tmp = new Olympic(country["id"], country["country"], country["participations"]);
          this.olympicsData.push(tmp);
        }
        console.log(this.olympicsData[0]);
        this.numberOfCountries = this.olympicsData.length;
      }
    );


/*    for (let country of this.olympicsData) {
      let countryMedals = 0;
      let countryName = country.country;
      for (let jo of country.participations) {
        countryMedals += jo.medalsCount;
      }
      this.dataByCountry.push({name: countryName, value: countryMedals});
    }*/
  }
}
