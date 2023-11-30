import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
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
  public chartValues: ChartValue[] = [];

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Utiliser le paramètre de la route pour obtenir le nom du pays
    this.route.paramMap.pipe(
      // Utiliser switchMap pour gérer les opérations asynchrones
      switchMap(params => 
        // Appeler olympicService pour obtenir la liste des pays
        this.olympicService.getOlympics().pipe(
          // Vérifier si le pays existe dans la liste
        map(pays => pays.find(p => p.country === params.get('country')))
      ))
    ).subscribe(selectedCountryData => {
      // Affecter les valeurs du graphique en fonction des données du pays sélectionné
      this.chartValues = selectedCountryData ? [{
        name: selectedCountryData.country,
        value: selectedCountryData.participations.reduce((sum, participation) => sum + participation.medalsCount, 0),
        numberEntries: selectedCountryData.participations.length,
        medalsCount: selectedCountryData.participations.reduce((sum, participation) => sum + participation.medalsCount, 0),
        athleteCount: selectedCountryData.participations.reduce((sum, participation) => sum + participation.athleteCount, 0),
      }] : [];
    });
  }
}
