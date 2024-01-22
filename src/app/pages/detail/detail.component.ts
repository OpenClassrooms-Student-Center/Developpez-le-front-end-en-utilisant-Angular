import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from './../../core/models/Olympic';
import { Participation } from './../../core/models/Participation';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>; // recuperation des informations au niveau (Olympic.json) de la base de données

  id!: number; // la variable pour identifier le pays selectionné.
  numberOfCountry: number = 0; // la variable pour identifier le nombre d'entrée.
  numberOfMedhal: number = 0; // la variable pour identifier le nombre de medailles.
  numberOfAthlete: number = 0; // la variable pour identifier le nombre d'athlètes.

  nameOfCountry!: string; // la variable permettant de connaitre le nom du pays selectionné.

  saleData: any[] = []; // la variable recevant les données du graph de la librairie ngx-charts
  yAxisLabel!: string; // la variable permettant de determiner le type des libelle en x
  xAxisLabel = 'Date'; // la variable permettant d'afficher le libelle en dessous du graph

  constructor(
    private olympicService: OlympicService, // Injecte le service dans la classe détail
    private router: Router, // Injecte le Router dans la classe détail
    private route: ActivatedRoute // Injecte de ActivatedRoute  dans la classe détail pour les paramètres dans l'URL
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];

    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$?.subscribe((data) => {
      const pays = data?.find((elt, i) => elt.id == this.id);
      if (!pays) {
        this.router.navigateByUrl('/');
      } else {
        this.nameOfCountry = pays?.country as string; // affectation de la valeur du nom du pays selectionné
        const participations = pays?.participations as Participation[]; // selection de toutes les participations
        this.numberOfAthlete = participations?.reduce(
          (total, value) => total + value.athleteCount,
          0
        ); // calcul et affection du nombre d'athète
        const series = participations?.map((elt) => ({
          value: elt.medalsCount,
          name: elt.year.toFixed(),
        })); // mise en place des données pour le graph dans ngx-charts
        this.numberOfCountry = series.length; // affection du nombre de participations
        this.numberOfMedhal = series.reduce(
          (total, value) => total + value.value,
          0
        ); // calcul et affection du nombre de medailles
        this.saleData = [{ name: pays?.country, series: series }]; // affection des données pour le graph
      }
    });
  }
}
