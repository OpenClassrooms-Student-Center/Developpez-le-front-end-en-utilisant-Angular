// home.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

// Interface pour représenter la participation
interface Participation {
  id: number;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}

// Interface pour représenter un pays avec ses participations
interface Country {
  id: number;
  country: string;
  participations: Participation[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Country[]> = of([]);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    // Charger les données olympiques au moment de l'initialisation
    this.olympics$ = this.olympicService.getOlympics();
  }

  // Fonction pour filtrer les données et obtenir le total des médailles pour chaque pays
  filterData(data: Country[]): any[] {
    // Initialiser un tableau pour stocker les résultats
    const result: any[] = [];
    
    // Parcourir chaque pays dans les données
    data.forEach((country) => {
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
  }
}
