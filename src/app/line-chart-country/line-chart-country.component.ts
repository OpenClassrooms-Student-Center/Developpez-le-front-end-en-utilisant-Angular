import { Component, OnInit, OnDestroy} from '@angular/core';
import { OlympicCountry } from '../core/models/OlympicCountry';
import { OlympicService } from '../core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-line-chart-country',
  templateUrl: './line-chart-country.component.html',
  styleUrl: './line-chart-country.component.scss',
  standalone: false
})
export class LineChartCountryComponent implements OnInit, OnDestroy{
  country! : OlympicCountry;
  nbOlympics! : number;
  nbMedals! : number;
  nbAthletes! : number;

  private subscriptions: Subscription[] = [];
  data!: { name: string; series: {name:number,value:number}[] }[];
  view: [number, number] = [800, 400];
  showXAxis = true;
  showYAxis = true;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  xAxisTickFormatting = (value: number) => Math.round(value).toString();
  showYAxisLabel = true;
  yAxisLabel = 'Medals won';
  yAxisTickFormatting = (value: number) => Math.round(value).toString();

  constructor( 
    private olympicService: OlympicService,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    const countryId : string = this.route.snapshot.params["id"];
    this.olympicService.loadInitialData();
    this.subscriptions.push(this.olympicService.getCountryById(countryId).subscribe((country: OlympicCountry | undefined) => {
      if (!country) {
        console.log('Pays non trouvé id:',countryId);
      } else {
        this.country = country;
        this.nbOlympics = country.participations.length
        this.nbMedals = country.getTotalMedals();
        this.nbAthletes = country.getTotalAthletes();
        this.data = [];
        const s : {name:number,value:number}[]= [];
        for (const participation of country.participations) {
          const c = {
            name: participation.year,
            value: participation.medalsCount
          };
          s.push(c);
        }
        this.data.push({name: "medal won according JO's year", series: s});
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
