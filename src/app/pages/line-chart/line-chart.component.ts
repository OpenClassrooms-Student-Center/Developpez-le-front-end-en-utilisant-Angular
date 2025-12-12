import { OlympicService } from 'src/app/core/services/olympic.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountUpDirective, LineChartModule, ScaleType } from '@swimlane/ngx-charts';
import { ActivatedRoute } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, filter, map, take } from 'rxjs/operators';

//On met en place 2 interfaces pour la gestion plus simplifiée des données
interface LineData{
  name: string;
  value: number;
}

interface LineChartData{
  name: string;
  series: LineData[];
}

//On crée un type pour 1 pays donné
type OlympicCountry = {
  id: number;
  country: string;
  participations: Array<{
    id: number;
    year: number;
    city: string;
    medalsCount: number;
    athleteCount: number;
  }>;
};

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [LineChartModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})

export class LineChartComponent implements OnInit, OnDestroy {

  //On initialise les données du graphique
  dataLine: LineChartData[] = [];

  //On met en place les configuration du graphique
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Année';
  yAxisLabel: string = 'Médailles';
  timeline: boolean = true;

  colorScheme = {
    domain: ['rgb(0, 165, 184)'],
    name: '',
    selectable: false,
    group: ScaleType.Ordinal
  };

  //Subjet qui va s'occuper de la destruction de l'observable
  private destroy$ = new Subject<void>();

  constructor(private olympicService: OlympicService, 
              private routeID: ActivatedRoute) { }

  ngOnInit(): void{
    this.loadLineChartData();
  }

  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadLineChartData(): void { 
    combineLatest([this.routeID.params,
      this.olympicService.getOlympics()
    ]).pipe(
      takeUntil(this.destroy$),
      filter(([params, olympics]) => !!params['id'] && !!olympics),
      map(([params, olympics]) => {
        const countryID = params['id'];
        const countries = olympics as any[];

        const country = countries.find(
          (c: OlympicCountry) => c.country === countryID
        );
        return { countryID, country};
      })
    ).subscribe(({ countryID, country}) => {
      if (country) {
        this.dataLine = [this.transformToLineChartData(countryID, country)];
      } else {
        //On gère ici le cas ou le pays n'existe pas
        this.dataLine = [];
      }
    });
  }

  private transformToLineChartData(countryName: string, country: OlympicCountry): LineChartData {
    return {
      name: countryName,
      series: country.participations
        .map(participation => ({
          name: participation.year.toString(),
          value: participation.medalsCount
        }))
        .sort((a, b) => parseInt(a.name) - parseInt(b.name)) //tri par année croissant
    };
  }
}
