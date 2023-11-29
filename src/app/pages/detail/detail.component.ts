import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import Olympic from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

// Interface pour définir la structure des valeurs de détail
interface ChartValue {
  name: string;
  value: number;
  numberEntries: number;
  medalsCount: number;
  athleteCount: number;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  public chartValues$: Observable<ChartValue[]> = of([]);
  public numberEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extraire le paramètre de route pour obtenir le nom du pays
    const countryName = this.route.snapshot.paramMap.get('country');

    // Obtenir les données olympiques
    this.olympics$ = this.olympicService.getOlympics();

    // Utilisation de l'opérateur pipe pour manipuler les données olympiques
    this.chartValues$ = this.olympics$.pipe(
      map((countries) => {
        // Filtrer les pays pour obtenir celui qui correspond au paramètre de la route
        const result: ChartValue[] = countries
          .filter((country) => country.country === countryName)
          .map((country) => {
            this.numberEntries = 0;

            // Calcul du total des médailles pour le pays en cours
            this.totalMedals = country.participations.reduce(
              (sum, participation) => {
                this.numberEntries++;
                return sum + participation.medalsCount;
              },
              0
            );

            // Calcul du total des athlètes pour le pays en cours
            this.totalAthletes = country.participations.reduce(
              (sum, participation) => sum + participation.athleteCount,
              0
            );

            // Création de l'objet ChartValue correspondant au pays en cours
            return {
              name: country.country,
              value: this.totalMedals,
              numberEntries: this.numberEntries,
              medalsCount: this.totalMedals,
              athleteCount: this.totalAthletes,
            };
          });

        return result;
      })
    );
  }
}
