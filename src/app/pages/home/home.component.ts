import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  //la partie de graphique
  single!: any[];
  multi!: any[];
  view: any[] = [700, 400];
  showLegend = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  olympicList: Olympic[] = [];
  olympicFormatData: any[] = [];
  numberOfJO: number = 0;

  //public olympics$: Observable<any> = of(null);
  constructor(
    private olympicService: OlympicService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe((res) => {
      this.olympicList = res;
      this.olympicFormatData = this.calculateMedalCountByCountry(this.olympicList);
      this.numberOfJO = this.calculateNumberOfJO();
    });
  }

  calculateMedalCountByCountry(data: Olympic[]): any[] {
    return data.map(country => {
      const totalMedals = country.participations.reduce(
        (total: any, participation: { medalsCount: any; }) => total + participation.medalsCount, 0);
      return { name: country.country, value: totalMedals };
    });
  }

  calculateNumberOfJO() {
    const uniqueYears = new Set<number>();
    if (this.olympicList) {
      this.olympicList.forEach(country => {
        country.participations.forEach(participation => {
          uniqueYears.add(participation.year);
        });
      });
    }
    const numberOfUniqueYears = uniqueYears.size;
    return numberOfUniqueYears;
  }

  onSelect(event: any) {
    //TODO: faire un control de country name /formatage
    console.log(event.name);
    const countryName = event.name;
    this.router.navigate(['/country/details', countryName]);
  }
}

