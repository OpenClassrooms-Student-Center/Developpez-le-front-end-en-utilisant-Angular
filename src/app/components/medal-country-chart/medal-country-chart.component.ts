import { Component, OnInit } from '@angular/core';
import {OlympicService} from "../../core/services/olympic.service";
import {Router} from "@angular/router";
import {MedalData} from "../../core/models/MedalData";
@Component({
  selector: 'app-medal-country-chart',
  templateUrl: './medal-country-chart.component.html',
  styleUrls: ['./medal-country-chart.component.scss']
})
export class MedalCountryChartComponent implements OnInit {

  constructor(private olympicService: OlympicService, private router: Router) {
  }

  country_medal_data: MedalData[] = [];

  // Variables pour le nombre de pays et de JO (nombres)
  number_of_country: number = 0;
  number_of_jo: number = 0;

  ngOnInit(): void {
    // Chargement et traitement des données des médailles
    this.olympicService.getOlympics().subscribe(olympicData => {
      // `olympicData` est de type `Olympic[]`
      this.country_medal_data = this.olympicService.calculOlympicData(olympicData);
      this.number_of_country = this.olympicService.calculCountry(olympicData);
      this.number_of_jo = this.olympicService.calculJo(olympicData);


    });
  }

}
