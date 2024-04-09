import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import {MedalData} from "../../core/models/MedalData";
import { Location } from '@angular/common';
import { SeriesDataYearsMedal } from '../../core/models/SeriesDataYearsMedal';




@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {

  countryDetails: Olympic[] = [];

  country_name: string = ''; // explication : sauvegarde du nom du pays
  number_of_entries: number = 0; // explication : nombre de participation
  // number_of_medals: number = 0; // explication : nombre de médailles
  number_of_athletes: number = 0; // explication : nombre d'athlètes
  country_medal_data: MedalData[] = [];
  seriesData: SeriesDataYearsMedal[] = []; // explication : données pour le graphique lineChart


  constructor(private location: Location, private olympicService: OlympicService, private route: ActivatedRoute) { } // Injection de ActivatedRoute ici

  ngOnInit() {

    const countryId = this.route.snapshot.params['countryId']; // Utilisation de ActivatedRoute pour obtenir l'ID du pays directement à partir de la route active
    console.log('countryId est bien le : ', countryId);
    // Utiliser le service pour récupérer les détails du pays
    this.olympicService.getCountryDetails(countryId as string).subscribe(data => {
      this.countryDetails = data;
      this.country_name = data[0].country;
      this.number_of_entries = this.olympicService.calculJo(data);
      this.country_medal_data = this.olympicService.calculOlympicData(data);
      this.number_of_athletes = this.olympicService.calculAthletes(data);
      this.seriesData = Object.values(this.olympicService.MedalYearsConvertData(data));

    });
  }

}


