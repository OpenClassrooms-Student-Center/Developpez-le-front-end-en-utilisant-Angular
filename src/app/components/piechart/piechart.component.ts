import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {

  @Input() data: any[] = []; // Propriété pour les données du graphique
  @Input() showLabels: boolean = true; // Propriété pour afficher les libellés
  @Input() explodeSlices: boolean = false; // Propriété pour l'explosion des tranches

  // Options de configuration
  pieChartOptions: any = {
    // Configurations supplémentaires ici
  };

  constructor() { }

  ngOnInit(): void {
    // Initialisations ou manipulations de données supplémentaires si nécessaires
  }
}
