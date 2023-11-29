import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import Olympic from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

interface ChartValue {
  name: string;
  value: number;
  numberEntries: number;
  medalsCount: number;
  athleteCount: number;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})

export class DetailComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  public chartValues$: Observable<ChartValue[]> = of([]);
  public numberEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.chartValues$ = this.olympics$.pipe(
      map((countries) => {
        const result: ChartValue[] = [];

        countries.forEach((country) => {
          this.numberEntries = 0;
          this.totalMedals = country.participations.reduce((value, participation) => {
            this.numberEntries++;
            return value + participation.medalsCount;
          }, 0);
    
          this.totalAthletes = country.participations.reduce((value, participation) => {
            return value + participation.athleteCount;
          }, 0);
    
          result.push({
            name: country.country,
            value: this.totalMedals,
            numberEntries: this.numberEntries,
            medalsCount: this.totalMedals, 
            athleteCount: this.totalAthletes,
          });
        });
        return result;
      })
    );
  }
}
