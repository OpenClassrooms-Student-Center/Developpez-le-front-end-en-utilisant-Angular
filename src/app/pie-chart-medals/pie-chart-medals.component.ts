
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OlympicService } from '../core/services/olympic.service';
import { OlympicCountry } from '../core/models/OlympicCountry';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-pie-chart-medals',
    templateUrl: './pie-chart-medals.component.html',
    styleUrls: ['./pie-chart-medals.component.scss'],
    standalone: false
})
export class PieChartMedalsComponent implements OnInit,OnDestroy{
 ;

  data!: { name: string; value: number}[];
  view: [number, number] = [800, 400];
  private subscriptions: Subscription[] = [];

  showLegend = false;
  showLabels = true;
  doughnut = false;

  nbCountry! : number;
  nbOlympics! : number; 

  constructor( 
    private olympicService: OlympicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData();
    this.subscriptions.push(this.olympicService.getOlympicCountries().subscribe((countries: OlympicCountry[] | undefined) => {
      this.data = [];
      if (countries) {
        for (const country of countries) {
          const c = {
            name: country.countryName,
            value: country.getTotalMedals(),
            id: country.id
          };
          this.data.push(c);
        }
      }
    }));
    this.subscriptions.push(this.olympicService.getNbCountry().subscribe((nbCountry: number) => {
      this.nbCountry = nbCountry;
    }));
    this.subscriptions.push(this.olympicService.getNbJO().subscribe((nbJO: number) => {
      this.nbOlympics = nbJO;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onClicOnCountry(event:{ name: string; value: number; label?: string }) {
    const countryClicked = this.olympicService.getCountryByName(event["name"]);
    if (countryClicked) {
      this.router.navigateByUrl('details/' + countryClicked.id);
    } else {
      console.warn("Pays non trouvé ou liste pas encore chargée");
    }
  }
}