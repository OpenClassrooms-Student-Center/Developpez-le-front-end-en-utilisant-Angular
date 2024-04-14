
import { Component, OnInit } from '@angular/core';
import {OlympicService} from "../../core/services/olympic.service";
import {Router} from "@angular/router";
import {MedalData} from "../../core/models/MedalData";
import {Subscription} from "rxjs";

/**
 * Medal Country Chart Component
 *
 * @export
 * @class MedalCountryChartComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'app-medal-country-chart',
  templateUrl: './medal-country-chart.component.html',
  styleUrls: ['./medal-country-chart.component.scss']
})
export class MedalCountryChartComponent implements OnInit {

  /**
   * En résumé, ce constructeur injecte deux dépendances dans le composant :
   *  olympicService et router.
   * Ces dépendances peuvent ensuite être utilisées dans le composant pour accéder aux données et aux fonctionnalités des services correspondants.
   * @param olympicService  // Fait appelle au fichier service qui regroupe le métier de notre application
   * @param router  // Fait référence au router lib angular qui permet de changer de page faire le routage
   */
  constructor(private olympicService: OlympicService, private router: Router) {
  }

  /**
   * Déclaration d'un tableau country_medal_data qui va prendre en interface MedalData
   */
  country_medal_data: MedalData[] = [];

  /**
   *Déclaration d'un nombre de pay à zero à implémentée avec la méthode
   */
  number_of_country: number = 0;
  /**
   *  Déclaration d'un nombre de JO à zero à implémentée avec la méthode
   */
  number_of_jo: number = 0;
  /**
   *  medal_chart_subscription de type Subscription et lui affecte une nouvelle instance de la classe Subscription.
   */
  medal_chart_subscription : Subscription = new Subscription;



  /**
   * ngOnDestroy(): Cette méthode est un crochet du cycle de vie dans les composants Angular.
   * Elle est automatiquement appelée par Angular lorsque le composant est détruitvou que l'application est déchargée.
   *
   */
  ngOnDestroy(): void {
    /**
     * - unsubscribe(): Cette ligne permet de se désabonner de l'abonnement à l'observable medal_chart_subscription.
     *  Les abonnements aux observables sont utilisés pour gérer les flux de données asynchrones dans Angular.
     *  En se désabonnant, le composant ne reçoit plus de mises à jour de données de l'observable,
     * ce qui évite les fuites de mémoire et les effets secondaires potentiels lorsque le composant n'est plus nécessaire.
     */
    this.medal_chart_subscription.unsubscribe()
  }


  /**
   *
   * ngOnInit est une méthode du cycle de vie des composants Angular.
   * Elle est appelée une seule fois, juste après l'initialisation du composant et de ses propriétés.
   */
  ngOnInit(): void {
    /**
     * Chargement et traitement des données des médailles
     * Fonction des différents calcul
     *
     */

    this.olympicService.getOlympics().subscribe(olympicData => {
      /**
       * `olympicData` est de type `Olympic[]`
       *  */
      this.country_medal_data = this.olympicService.calculOlympicData(olympicData);
      this.number_of_country = this.olympicService.calculCountry(olympicData);
      this.number_of_jo = this.olympicService.calculJo(olympicData);


    });
  }

  /**
   *Function de Click du bouton sur la graphique chart-pie qui permet d'ouvrire
   * une nouvelle page avec en paramêtre l'id du pays cliquer
   * Renvoie sur la page detail(id) pour affciher les détails du pays
   */
  onCountryClick(event: any): void {
    /**
     * const pour pourassociée l'id
     * log pour vérification sur console
     * navigation vers la page détail avec l'id en param url
     */
    const countryId:number = event.extra.id; // `countryId` est de type `number`
    console.log('countryId', countryId)
    this.router.navigate(['/details-country/', countryId]).then();
  }

}
