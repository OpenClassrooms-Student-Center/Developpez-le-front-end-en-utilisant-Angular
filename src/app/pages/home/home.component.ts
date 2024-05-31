import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);

  constructor(private olympicService: OlympicService) {}

  public countries: string[] = [];
  public medals: number[] = [];

  public medalsPerCountry = this.olympicService.getMedalsPerCountry();

 
  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.medalsPerCountry = this.olympicService.getMedalsPerCountry();

    console.log("MedalsPerCountry : ")
    console.log(this.medalsPerCountry);
    
    this.countries = this.olympicService.getCountries();
    console.log("Countries : ");
    console.log(this.countries);

    this.medals = this.olympicService.getMedals();
    console.log("Medals : ");
    console.log(this.medals);
    
  }

}
