import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/core/models/Header';
import { Olympic } from 'src/app/core/models/Olympic';
import { PieData as DataPie } from 'src/app/core/models/PieData';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.scss',
})
export class PieComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  dataChart!: DataPie[];
  olympics!: Olympic[];
  joCount!: number;
  header!: Header;

  colorScheme = [
    { name: 'Italy', value: '#a95963' },
    { name: 'Spain', value: '#a8385d' },
    { name: 'Germany', value: '#7aa3e5' },
    { name: 'United States', value: '#793d52' },
    { name: 'France', value: '#aae3f5' },
  ];

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.subscription.push(
      this.olympicService.getOlympics().subscribe((result) => {
        if (result) {
          this.initData();
          this.header = {
            title: 'Medals per Country',
            indicator: [
              {
                description: 'Number of JOs',
                value: this.joCount,
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
      this.router.navigate(['/details', selectCountry.id]);
    }
  }
}
