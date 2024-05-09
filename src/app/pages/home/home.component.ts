import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { EventGraph } from 'src/app/core/models/EventGraph';
import { Graph } from 'src/app/core/models/Graph';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  //la partie de graphique
  view: number[] = [700, 400];
  showLegend: boolean = true;

  showLabels: boolean = true;
  explodeSlices: boolean = false;
  doughnut: boolean = false;

  olympicList: Olympic[] = [];
  olympicFormatData: Graph[] = [];
  numberOfJO: number = 0;
  subscription!: Subscription;

  constructor(
    private olympicService: OlympicService,
    private router: Router
  ) {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.olympicService.getOlympics().subscribe((res) => {
      this.olympicList = res;
      this.olympicFormatData = this.calculateMedalCountByCountry(this.olympicList);
      this.numberOfJO = this.calculateNumberOfJO();
    });
  }

  calculateMedalCountByCountry(data: Olympic[]): Graph[] {
    return data.map(country => {
      const totalMedals = country.participations.reduce(
        (total: number, participation: { medalsCount: number; }) => total + participation.medalsCount, 0);
      return { name: country.country, value: totalMedals };
    });
  }

  calculateNumberOfJO(): number {
    const uniqueYears = new Set<number>();
    if (this.olympicList) {
      this.olympicList.forEach(country => {
        country.participations.forEach(participation => {
          uniqueYears.add(participation.year);
        });
      });
    }
    return uniqueYears.size;
  }

  onSelect(event: EventGraph): void {
    //TODO: faire un control de country name /formatage
    console.log(event.name);
    this.router.navigate(['/country/', event.name]);
  }
}

