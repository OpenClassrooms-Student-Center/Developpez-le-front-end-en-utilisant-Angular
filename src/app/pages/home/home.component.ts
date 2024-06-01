import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import {
  LegendPosition,
  NgxChartsModule,
  ColorHelper,
  ScaleType,
} from '@swimlane/ngx-charts';
import { shadeRGBColor, hexToRgb, invertColor} from '@swimlane/ngx-charts';
import { HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private olympicService: OlympicService, private router: Router) {}

  // Initialisation des donnees pour les bulles d'infos
  windowWidth = window.innerWidth;
  pageTitle = 'Medals per Country';
  info1 = 'Number of JOs';
  numberOfJOs!: number;
  info2 = 'Number of countries';
  numberOfCountries!: number;

  // Initialisation des observables
  public olympics$: Observable<Olympic[]> = of([]);
  public medalsPerCountry$: Observable<{ name: string; value: number }[]> = of(
    []
  );
 

  // PIE CHART options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  customColors = [
    { name: 'Italy', value: '#956065' },
    { name: 'Spain', value: '#b8cbe7' },
    { name: 'United States', value: '#89a1db' },
    { name: 'Germany', value: '#793d52' },
    { name: 'France', value: '#9780a1' },
  ];
  colorHelper = new ColorHelper('cool', ScaleType.Linear, [0, 100], this.customColors);
  legendPosition: LegendPosition = LegendPosition.Below;
  legendTitle = '';
 

  // Responsive
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.windowWidth = window.innerWidth;
    this.showLabels = this.windowWidth > 600;
    this.showLegend = this.windowWidth < 600;
  }

  // Redirection vers page de detail
  onSelectCountry(event: { name: any; }): void {
    this.router.navigate(['/detail', event.name]);
    console.log(event.name);
  }

  ngOnInit(): void {
    // Initialisation des parametres responsives
    this.showLabels = this.windowWidth > 600;
    this.showLegend = this.windowWidth < 600;

    // Recup des données
    this.olympics$ = this.olympicService.getOlympics();
    this.medalsPerCountry$ = this.olympicService.getMedalsPerCountry();
    console.log(this.medalsPerCountry$);

    // Calcul des valeurs
    this.olympicService.getCountries().subscribe((countries) => {
      this.numberOfCountries = countries.length;
    });

    this.olympicService.getNumberOfJOs().subscribe((numberOfJOs) => {
      this.numberOfJOs = numberOfJOs;
    });
  }
}
