import { Component, OnDestroy, OnInit } from '@angular/core'; 
import { combineLatest, map, Observable, of, Subscription } from 'rxjs';
import { Olympic } from 'app/core/models/Olympic';
import { OlympicService } from 'app/core/services/olympic.service';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  /* Initialisation des données à stocker 
  et à retourner sous forme de graphique de type pie.
  */
  
  public olympics$: Observable<Olympic[]> = of([]); 
  private subscriptions: Subscription[] = []; 
  public olympicsNumber!: number;
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true, 
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, 
        position: 'bottom', 
        reverse: true,  
      },
    },
  }; 
  
  constructor(private olympicService: OlympicService, private router: Router) {} 
  

  /* Crée l'évenement lors du clique
  * param event - any
  */

    detailCountry(event: any) {
      const index  = event.active[0].index;
      const id = index + 1 ;
      this.router.navigate([`detail/${id}`]);
  }


  /* 
  Méthodes executées lors de l'initialisation du component
  */
  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    const olympicCountries$ = this.olympics$.pipe(
      map((olympics: Olympic[]) => olympics.map((o: Olympic) => o.country))
    );

    const olympicMedalCount$ = this.olympics$.pipe(
      map((olympics: Olympic[]) =>
        olympics.map((o: Olympic) =>
          o.participations.reduce((accumulator, current) => accumulator + current.medalsCount, 0)
        )
      )
    );

    const subscription = combineLatest([
      olympicCountries$,
      olympicMedalCount$,
    ]).subscribe(([country, medalCounts]) => {

      this.olympicsNumber = country.length;

      this.pieChartData = {
        labels: country, 
        datasets: [
          {
            data: medalCounts, 
            backgroundColor: [
              'rgb(149, 96, 101)',
              'rgb(184, 203, 231)',
              'rgb(137, 161, 219)',
              'rgb(121, 61, 82)',
              'rgb(151, 128, 161)',
            ],
            hoverOffset : 10
          },
        ],
      };
    });
 
    this.subscriptions.push(subscription);
  }

  //Désabonnement avant la destruction du component
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}