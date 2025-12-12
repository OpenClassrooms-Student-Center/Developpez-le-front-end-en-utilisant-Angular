import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

type OlympicCountry = {
  id: number;
  country: string;
  participations: Array<{
    id: number;
    year: number;
    city: string;
    medalsCount: number;
    athleteCount: number;
  }>;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {

  //J'attache le composant Pie-Chart enfant à mon composant parent
  @ViewChild(PieChartComponent) pieChart!: PieChartComponent;

  //J'initialise les données statistiques qui seront affichées
  numberOfJOs: number = 0;
  numberOfCountries: number = 0;

  //J'initialise le Subject pour la destruction de mon observable
  private destroy$ = new Subject<void>();

  constructor(private olympicService: OlympicService){}

  ngOnInit(): void {
    //La méthode calculateStatistics me permet d'avoir qu'un seul abonnement
    this.olympicService.getOlympics()
    .pipe(takeUntil(this.destroy$)).subscribe(olympics => {
      if(olympics) {
        this.calculateStatistics(olympics as any[])
      }
    });
  }

  ngOnDestroy(): void {
    //On nettoye les abonnements à mon observable
    this.destroy$.next();
    this.destroy$.complete();
  }

  private calculateStatistics(countries: OlympicCountry[]): void {
    //Le nombre de pays est déterminer par la taille de mon tableau dans mon observable
    this.numberOfCountries = countries.length;
    /*On trouve le nombre de JO en comptant le nombre d'année uniques de participation 
    (ca évite des problèmes en cas d'erreurs dans les données)*/
    const uniqueYears = new Set<number>();
    countries.forEach(country => {
      country.participations.forEach(participation => {
        uniqueYears.add(participation.year);
      });
    });
    this.numberOfJOs = uniqueYears.size;
  }

  numberOfOlympics(): number {
    return this.numberOfJOs;
  }

  numberOfCountry(): number {
    return this.numberOfCountries;
  }
}



