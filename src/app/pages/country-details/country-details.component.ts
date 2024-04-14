
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import {MedalData} from "../../core/models/MedalData";
import { Location } from '@angular/common';
import { SeriesDataYearsMedal } from '../../core/models/SeriesDataYearsMedal';
import {Subscription} from "rxjs";

/**
 * Composant Détails Pays
 *
 * Ce composant affiche les détails d'un pays spécifique participant aux Jeux Olympiques.
 * Il récupère les données du `OlympicService` et remplit diverses propriétés pour afficher des informations sur l'historique de participation du pays.
 *
 * @export
 * @class CountryDetailsComponent
 * @implements {OnInit}, OnDestroy
 */


@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {

  /**
   * Tableau contenant les détails des participations olympiques du pays, récupéré auprès du `OlympicService`.
   */
  countryDetails: Olympic[] = [];

  /**
   * Nom du pays récupéré du tableau `countryDetails`.
   */
  country_name: string = ''; // Explication : sauvegarde du nom du pays

  /**
   * Nombre de participations du pays aux Jeux Olympiques, calculé à l'aide de la méthode `olympicService.calculJo`.
   */
  number_of_entries: number = 0; // Explication : nombre de participation


  /**
   * Nombre d'athlètes de ce pays ayant participé aux Jeux Olympiques, calculé à l'aide de la méthode `olympicService.calculAthletes`.
   */
  number_of_athletes: number = 0; // Explication : nombre d'athlètes

  /**
   * Tableau contenant les données des médailles du pays, récupéré auprès du `OlympicService`.
   */
  country_medal_data: MedalData[] = [];

  /**
   * Tableau contenant les données du graphique linéaire, représentant la répartition des médailles du pays par année, transformé à l'aide de la méthode `olympicService.MedalYearsConvertData`.
   */
  seriesData: SeriesDataYearsMedal[] = []; // Explication : données pour le graphique lineChart

  /**
   * Objet d'abonnement utilisé pour gérer le processus de désabonnement dans `ngOnDestroy`.
   */
  countryDetailSubscription: Subscription = new Subscription;

  /**
   * Injecte les services `Location`, `OlympicService` et `ActivatedRoute` dans le constructeur du composant.
   *
   * @param location - Service Angular `Location` pour la manipulation de la navigation.
   * @param olympicService - Service personnalisé `OlympicService` fournissant des méthodes pour récupérer et traiter les données olympiques.
   * @param route - Service Angular `ActivatedRoute` pour accéder aux paramètres de la route.
   */

  constructor(private location: Location, private olympicService: OlympicService, private route: ActivatedRoute) { } // Injection de ActivatedRoute ici

  /**
   * Se désabonne du `countryDetailSubscription` pour empêcher les fuites de mémoire lorsque le composant est détruit.
   */
  ngOnDestroy(): void {
    this.countryDetailSubscription.unsubscribe()
  }

  /**
   * Fetches country details and processes them for display on the component template.
   *
   * 1. Récupère le paramètre `countryId` de la route activée.
   * 2. Journalise le `countryId` récupéré dans la console.
   * 3. S'abonne à l'observable `olympicService.getCountryDetails`, en passant le `countryId` comme paramètre.
   * 4. Traite les données récupérées (`data`):
   *    - Affecte les données à la propriété `countryDetails`.
   *    - Extrait le nom du pays du premier élément de `data` et l'assigne à `country_name`.
   *    - Calcule le nombre de participations à l'aide de `olympicService.calculJo` et l'assigne à `number_of_entries`.
   *    - Récupère les données des médailles à l'aide de `olympicService.calculOlympicData` et les assigne à `country_medal_data`.
   *    - Calcule le nombre d'athlètes à l'aide de `olympicService.calculAthletes` et l'assigne à `number_of_athletes`.
   *    - Transforme les données des médailles pour le graphique linéaire à l'aide de `olympicService.MedalYearsConvert
   */

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


