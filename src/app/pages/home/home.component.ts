import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import Olympic from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

interface ChartValue {
  name: string;
  value: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  public chartValues$: Observable<ChartValue[]> = of([]);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    // Charger les données olympiques au moment de l'initialisation
    this.olympics$ = this.olympicService.getOlympics();

    this.chartValues$ = this.olympics$.pipe(
      map((countries) => {
        const result: ChartValue[] = [];
        countries.forEach((country) => {
          // Calculer le total des médailles pour le pays actuel
          const totalMedals = country.participations.reduce((sum, participation) => {
            return sum + participation.medalsCount;
          }, 0);
          // Ajouter le résultat au tableau
          result.push({
            name: country.country,
            value: totalMedals,
          });
        });
        // Retourner le tableau de résultats
        return result;
      })
    );
  }
}