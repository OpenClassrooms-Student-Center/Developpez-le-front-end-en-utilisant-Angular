import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Olympics } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import { Participation } from 'src/app/core/models/Participation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  public olympics: Olympics[] = [];
  public chartData: any[] = [];
  public numberOfCountries: number = 0;
  public numberOfCities: number = 0;
  private subscription!: Subscription
  public errMsg: string = ""
  public error: boolean = false
  

  public iconData = './assets/gold-medal.png';

  constructor(private olympicService: OlympicService, private router: Router) {}
  
  ngOnInit(): void {
    this.subscription = this.olympicService.getOlympics().subscribe(
      (data) => {
      this.olympics = data;
      this.numberOfCountries = this.olympics.length;

      //Set pour stocker les villes de façon uniques
      const uniqueCities = new Set<string>(); 
      this.olympics.forEach((country) => {
        country.participations?.forEach((participation: Participation) => {
          if (participation.city !== undefined) {
            uniqueCities.add(participation.city);
          }
        });
      });
      // Récupérer le nombre de villes distinctes
      this.numberOfCities = uniqueCities.size;

      //Prepare data pour graphique
      this.chartData = this.olympics.map(country => ({
        id: country.id,
        name: country.country ?? '',
        value: country.participations?.reduce((total, p) => total + (p.medalsCount ?? 0), 0)
      }));
     },
      (error) => {
        this.errMsg = error
        this.error = true
      }
    );
  }
  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe()
  }

  detailOfCountry(event: any): void{
    if(event.name){
		//compare le nom de chaque country avec le name de l'event
      const selectedCountry = this.olympics.find(country => country.country === event.name);
      //TODO : créer le guard pour les id inconnus
     selectedCountry ? this.router.navigate(['/country-detail', selectedCountry.id]) : this.router.navigate(['/not-found'])
    }
  }
 
}
