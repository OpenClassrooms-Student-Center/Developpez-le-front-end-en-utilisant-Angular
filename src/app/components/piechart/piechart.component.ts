import { Component,Input, OnInit } from '@angular/core';
import { Observable, filter, of } from 'rxjs';
import Olympic from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {
  public olympics$: Observable<Olympic[]>;


  data = [
    {
      "name": "Germany",
      "value": 40632,
      "extra": {
        "code": "de"
      }
    },
    {
      "name": "United States",
      "value": 50000,
      "extra": {
        "code": "us"
      }
    },
    {
      "name": "France",
      "value": 36745,
      "extra": {
        "code": "fr"
      }
    },
    {
      "name": "United Kingdom",
      "value": 36240,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "Spain",
      "value": 33000,
      "extra": {
        "code": "es"
      }
    },
    {
      "name": "Italy",
      "value": 35800,
      "extra": {
        "code": "it"
      }
    }
  ]; // Propriété pour les données du graphique
  @Input() explodeSlices: boolean = false; // Propriété pour l'explosion des tranches
  
  // Options de configuration
  pieChartOptions: any = {
    // Configurations supplémentaires ici
  };
  
  constructor(private olympicService: OlympicService) {
    this.olympics$ = this.olympicService.getOlympics().pipe(filter(value => value));
  }


  ngOnInit(): void {
    
    console.log(this.olympics$)
    // Initialisations ou manipulations de données supplémentaires si nécessaires
  }
}
