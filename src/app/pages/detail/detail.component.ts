// detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import Olympic from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

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

    this.olympics$ = this.olympicService.getOlympics();

    this.chartValues$ = this.olympics$.pipe(
      map((countries) => {
        const result: ChartValue[] = [];

        countries.forEach((country) => {
          if (country.country === countryName) {
            // Réinitialiser le nombre d'entrées pour chaque pays
            this.numberEntries = 0;

            this.totalMedals = country.participations.reduce((sum, participation) => {
              // Incrémenter le nombre d'entrées à chaque participation
              this.numberEntries++;
              return sum + participation.medalsCount;
            }, 0);

            this.totalAthletes = country.participations.reduce((sum, participation) => {
              return sum + participation.athleteCount;
            }, 0);

            result.push({
              name: country.country,
              value: this.totalMedals,
              numberEntries: this.numberEntries,
              medalsCount: this.totalMedals,
              athleteCount: this.totalAthletes,
            });
          }
        });
        return result;
      })
    );
  }
}
