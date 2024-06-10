import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit 
{
  olympics$: Observable<Olympic[]> = of([]);
  chartData: {city : String, year : Number}[] = [];

  JOsCount: Number = 0;
  countriesCount: Number = 0;

  // Chart parameters
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  colorScheme: any = {domain: ['#956065', '#793D52', '#89A1DB', '#9780A1', '#BFE0F1', '#B8CBE7']}

  constructor(private olympicService: OlympicService,
              private router: Router) {}

  ngOnInit(): void {
    // Fetch data and subscribe for changes
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe(data => this.onOlympicsUpdate(data));
  }

  // Parse Olympics to be used with the pie chart
  private formatOlympics(olympics : Olympic[]) : any {
    return olympics.map(olympic => ({
        name: olympic.country,
        value: olympic.participations?.reduce((sum: number, p: { medalsCount: number }) => sum + p.medalsCount, 0),
        participations: olympic.participations, 
      }));
  }

  // Navigate to the Details page of the selected country
  onCountrySelected(data : any) : void {
    this.router.navigateByUrl(`details/${data.name}`)
  }

  // Called whenever our data changed
  private onOlympicsUpdate(data : Olympic[]) {
    this.chartData = this.formatOlympics(data);
    this.countriesCount = data.length;

    // Calculate number of JOs
    let jos : { city : String, year : Number}[] = [];
    data.forEach(olympic => {
      if (olympic.participations)
      {
        olympic.participations.forEach(participation => {
          let b = jos.find((jo) => jo.city === participation.city && jo.year === participation.year)
          if (b === undefined)
            jos.push({ city : participation.city, year : participation.year});
        })
      }
    });
    this.JOsCount = jos.length;
  }
}
