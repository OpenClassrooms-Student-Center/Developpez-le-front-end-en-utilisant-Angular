import { Observable, of, Subject, combineLatest } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { takeUntil, map, filter } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { LineChartComponent } from "../line-chart/line-chart.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { participation } from 'src/app/core/models/Participation';

type OlympicCountry = {
  id: number;
  country: string;
  participations: participation[];
};

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [LineChartComponent, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent implements OnInit, OnDestroy {

  @ViewChild(LineChartComponent) lineChart!: LineChartComponent;
  
  //Les données utiles à présenter
  countryName: string = '';
  entriesCount: number = 0;
  totalMedals: number = 0;
  totalAthletes: number = 0;

  //Subject pour la destruction des observables
  private destroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute, 
              private olympicService: OlympicService, 
              private router: Router){}

  ngOnInit(): void {
    //On combine ici les paramètres de route et les données de l'observable Olympiques
    combineLatest([
      this.activatedRoute.params,
      this.olympicService.getOlympics()
    ]).pipe(
      takeUntil(this.destroy$),
      filter(([params, olympics]) => !!params['id'] && !!olympics),
      map(([params, olympics]) => {
        const countryId = params['id'];
        const countriesArray = olympics as any[];

        const country = countriesArray.find(
          (olympic: OlympicCountry) => olympic.country === countryId
        );

        return { countryId, country};
      })
    ).subscribe(({ countryId, country}) => {
        this.countryName = countryId;

        if(country) {
          this.calculateStatistics(country);
        } else {
          this.router.navigate(['/']);
        }
    });
  }

  ngOnDestroy(): void {
    //Complète et ferme les observables
    this.destroy$.next();
    this.destroy$.complete();
  }

  //Centralise tous les calculs pour le pays donné
  private calculateStatistics(country: OlympicCountry): void{
    this.entriesCount = country.participations.length;

    this.totalMedals = country.participations.reduce(
      (sum, participation) => sum + participation.medalsCount,
      0
    );

    this.totalAthletes = country.participations.reduce(
      (sum, participation) => sum + participation.athleteCount,
      0
    );
  }

  returnHome(){
    this.router.navigate(['/']);
  }

  displayNameCountry(): string {
    return this.countryName;
  }

  entriesNumber(): number {
    return this.entriesCount;
  }

  totalMedalsforCountry(): number {
    return this.totalMedals;
  }

  totalAthletesForCountry(): number {
    return this.totalAthletes;
  }
}