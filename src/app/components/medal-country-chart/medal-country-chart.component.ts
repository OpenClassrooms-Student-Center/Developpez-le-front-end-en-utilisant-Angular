import { Component, OnInit } from '@angular/core';
import {OlympicService} from "../../core/services/olympic.service";
import {Router} from "@angular/router";
import {MedalData} from "../../core/models/MedalData";
import {Subscription} from "rxjs";
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
  medal_chart_subscription : Subscription = new Subscription;


  ngOnDestroy(): void {
    this.medal_chart_subscription.unsubscribe()
  }

  ngOnInit(): void {
    // Chargement et traitement des données des médailles
    this.olympicService.getOlympics().subscribe(olympicData => {
      // `olympicData` est de type `Olympic[]`
      this.country_medal_data = this.olympicService.calculOlympicData(olympicData);
      this.number_of_country = this.olympicService.calculCountry(olympicData);
      this.number_of_jo = this.olympicService.calculJo(olympicData);


    });
  }
  onCountryClick(event: any): void {
    const countryId:number = event.extra.id; // `countryId` est de type `number`
    console.log('countryId', countryId)
    this.router.navigate(['/details-country/', countryId]).then();
  }

}
