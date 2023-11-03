import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/olympic-data.service";
import { OlympicData } from "../../models/olympic-data.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  olympicData!: OlympicData[];
  public nbJO!: number;
  public nbCountry!: number;

  // Pie
  view: [number, number] = [700, 400];
  single!: { name: string; value: number; }[]

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data: OlympicData[]): void => {
      // load data
      this.olympicData = data;

      // add number of country
      this.nbCountry = this.olympicData.length;

      // add number of JO
      const allYears: Set<number> = new Set();
      this.olympicData.forEach(data => {
        data.participations.forEach(participation => {
          allYears.add(participation.year);
        });
      });
      this.nbJO = allYears.size;

      // add pie chart data
      this.single = this.olympicData.map(data => {
        const totalMedals = data.participations.reduce(
          (acc, participation) => acc + participation.medalsCount, 0);
        return {
          name: data.country,
          value: totalMedals
        };
      });
    });
  }

  onSelect(event: { name: string; }): void {
    const countryClicked: string = event.name;
    this.router.navigate(['/details', countryClicked]);
  }
}
