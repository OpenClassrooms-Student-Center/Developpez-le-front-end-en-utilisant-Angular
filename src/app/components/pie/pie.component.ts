import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/core/models/Header';
import { Olympic } from 'src/app/core/models/Olympic';
import { PieData } from 'src/app/core/models/PieData';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.scss',
})
export class PieComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  dataChart!: PieData[];
  olympics!: Olympic[];
  joCount!: number;
  view: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  /*
  colorScheme = {
    domain: ['#a95963', '#a8385d', '#7aa3e5', '#7aa3e5', '#aae3f5'],
  };*/
  totalJo!: number;
  header!: Header;

  colorScheme = [
    { name: 'Italy', value: '#956065' },
    { name: 'Spain', value: '#b8cbe7' },
    { name: 'Germany', value: '#793d52' },
    { name: 'United States', value: '#89a1db' },
    { name: 'France', value: '#9780a1' },
  ];

  constructor(private olympicService: OlympicService, private router: Router) {}
  ngOnInit(): void {
    this.subscription.push(
      this.olympicService.getOlympics().subscribe((olympics) => {
        if (olympics) {
          this.initData();
          this.header = {
            title: 'Medals per Country',
            indicator: [
              {
                description: 'Number of JOs',
                value: this.totalJo,
              },
              {
                description: 'Number of countries',
                value: this.olympics.length,
              },
            ],
          };
        }
      })
    );
  }

  public ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }
  /**
   * La fonction 'initData' contient toutes les fonctions du service nécessaires
   * pour le démarrage de la page d'accueil.
   */
  private initData(): void {
    this.subscription.push(
      this.olympicService
        .getTotalJo()
        .subscribe((totalJo) => (this.joCount = totalJo))
    );

    this.subscription.push(
      this.olympicService
        .getOlympics()
        .subscribe((olympic) => (this.olympics = olympic))
    );

    this.subscription.push(
      this.olympicService
        .getPieData()
        .subscribe((data) => (this.dataChart = data))
    );
  }

  public goToDetails(event: {
    name: string;
    value: number;
    label: string;
  }): void {
    const selectCountry = this.olympics.find(
      (olympic) => olympic.country === event.name
    );

    if (selectCountry) {
      this.router.navigate(['/detail', selectCountry.id]);
    }
  }
}
