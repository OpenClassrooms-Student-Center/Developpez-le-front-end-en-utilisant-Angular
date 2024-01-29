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
  public message: string = "Données en cours de chargement"
  public messageVisible: boolean = true
  public iconData = './assets/gold-medal.png';

  constructor(private olympicService: OlympicService, private router: Router) {}
  
  ngOnInit(): void {
    this.subscription = this.olympicService.getOlympics().subscribe({
      next: (data) => {
        this.olympics = data;
        if(this.numberOfCountries ===  null) this.message = "Pas de résultats"
        else{
          this.numberOfCountries = this.olympics.length;
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
          this.messageVisible = false
        }   
      },
      error: (error) => {
        this.message = error;
        this.messageVisible = true
        }
      });
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe()
  }

  detailOfCountry(event: any): void{
    if(event.name){
		//compare le nom de chaque country avec le name de l'event
      const selectedCountry = this.olympics.find(country => country.country === event.name);
      this.router.navigate(['/country-detail', selectedCountry?.id])
    }
  }

}
