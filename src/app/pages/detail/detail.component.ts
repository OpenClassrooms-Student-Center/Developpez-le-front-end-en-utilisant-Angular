import { Component, OnDestroy, OnInit } from '@angular/core';
import { Olympic } from 'app/core/models/Olympic';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from 'app/core/services/olympic.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Participation } from 'app/core/models/Participation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  /* La classe DetailComponent permet d'initilaiser les données à stocker 
  et à retourner pour chaque pays, sous forme de graphique de type line.
  */ 
  olympic!: Olympic;
  totalMedals!: number;
  totalAthletes!: number;
  private subscriptions: Subscription[] = [];
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };

  
 public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0,
      },
    },
    scales: {
      y: {
        position: 'left', 
        suggestedMin: 0,
        suggestedMax: 140,
      },
    },

    plugins: {
      legend: { display: true }, 
    },
  };

  public lineChartType: ChartType = 'line'; 

  constructor(private olymmpicService: OlympicService, private route: ActivatedRoute, private router: Router) {}

  // Cette fonction permet de retourner à la page d'accueil via l'URL
  returnToHomePage() {
    this.router.navigateByUrl('');
  }

  /* La méthode ngOnInit est une méthode de cycle de vie du composant DetailcComponent.
  Au sein de cette méthode on récupère l'id depuis la route, utilisé pour récupérer les données détaillées de chaque pays participant au JO via le service.
  Si la variable "olympics" existe et si sa longueur est supérieur à 0 alors on accède au premier élément du tableau, sinon on retourne à la page d'accueil.
  Par la suite, on ajoute avec le push un abonnement au tableau Subscription. Si la variable olympic est vrai, alors on accède à la pro^riété lineChartData 
  et le graphique commence à se mettre en place. 
  Ensuite, Le nombres de médailles et d'athlètes sont calculées en additonant les propriétes de chaque élément du tableau participation de l'objet Olympic. 
  */
  ngOnInit(): void {
    const olympicCountry = +this.route.snapshot.params['id'];
    const subscription = this.olymmpicService
      .getOlympicsById(olympicCountry)
      .subscribe((olympics: Olympic[]) => {
        if (olympics && olympics.length) {
          this.olympic = olympics[0]; 
        } else {
          this.returnToHomePage();
        }
      });
    this.subscriptions.push(subscription);
    if (this.olympic) {
      this.lineChartData = {
        datasets: [
          {
            data: this.olympic.participations.map((p) => {
              return p.medalsCount;
            }),
            label: 'Nombre de médailles obtenues par année',
            backgroundColor: 'yellow',
            borderColor: 'rgba(4, 131, 143, 1)',
            pointBackgroundColor: 'rgba(4, 131, 143, 1)',
            pointBorderColor: 'yellow',
            pointHoverBackgroundColor: 'yellow',
            pointHoverBorderColor: 'rgba(4, 131, 143, 1)',
          },
        ],
        labels: this.olympic.participations.map((p: Participation) => {
          return p.year;
        }),
      };
      this.totalMedals = this.olympic.participations.reduce(
        (accumulator, current) => accumulator + current.medalsCount,0
      );
      this.totalAthletes = this.olympic.participations.reduce(
        (accumulator, current) => accumulator + current.athleteCount,0
      );
    }
  }

/* La méthode ngOnDestroy est utilisée pour effectuer des tâches de nettoyage avant que le composant soit détruit 
comme annuler des abonnements à des observables.
On utilise le unsubscribe afin de libérer de la mémoire et éviter la consommation inutle du processeur.
*/
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}


