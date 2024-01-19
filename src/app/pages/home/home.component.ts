import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Observable, of } from 'rxjs';
import { Olympics } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
//   public olympics$: Observable<Olympics[]> = of([]);

  public olympics: Olympics[] = [];
  public chartData: any[] = [];
  public numberOfCountries: number = 0;
  public numberOfCities: number = 0;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe(data => {
      console.log(data)
      this.olympics = data;
      this.numberOfCountries = this.olympics.length;

      // Utiliser un Set pour stocker les villes de façon uniques
      const uniqueCities = new Set<string>(); 
      this.olympics.forEach((country) => {
        country.participations.forEach((participation) => {
          uniqueCities.add(participation.city);
        });
      });
      // Récupérer le nombre de villes distinctes
      this.numberOfCities = uniqueCities.size;

      this.chartData = this.olympics.map(country => ({
        id: country.id,
        name: country.country,
        value: country.participations.reduce((total, p) => total + p.medalsCount, 0),
      }));
    });
  }
  
  //Récupère l'id du pays cliquer pour ouvrir la page country-detail
  detailOfCountry(event: any): void{
    if(event.name){
		//compare le nom de chaque country avec le name de l'event
      const selectedCountry = this.olympics.find(country => country.country === event.name);
      //TODO : créer le guard pour les id inconnus
     selectedCountry ? this.router.navigate(['/country-detail', selectedCountry.id]) : this.router.navigate(['/not-found'])
    }
  }
 
}
