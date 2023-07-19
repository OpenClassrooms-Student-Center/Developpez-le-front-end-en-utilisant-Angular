import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Observable, of, pipe, map, count } from 'rxjs';
import { Country } from 'src/app/core/models/Country';
import { Participation } from 'src/app/core/models/Participation';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  currentOlympicCountry!: Country
  ngxChartsData!: Array<object>;
  numberOfEntries!: number
  totalNumberMedals!: number;
  totalNumberOfAthletes!: number;
  countryName!: string;

  // ngx-charts options
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  timeline: boolean = false;
  colorScheme = { domain: ['#5AA454']};

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.olympicService.getOlympics().pipe(
      map((value) => {
        if (typeof value === 'object') {
          this.getgetOlympicById(value);

          if (this.currentOlympicCountry != undefined) {
            this.ngxChartsData = 
              this.createDataToNgxCharts(this.currentOlympicCountry);
            this.totalNumberMedals = 
              this.getTotalBumberMedals(this.currentOlympicCountry);
            this.totalNumberOfAthletes = 
              this.getTotalNumberAthletes(this.currentOlympicCountry);
            this.numberOfEntries = 
              this.currentOlympicCountry.participations.length;
            this.countryName = 
              this.currentOlympicCountry.country;
  
          } 
        }
      })
    ).subscribe();
    this.getColorCharts()
  }

  getgetOlympicById(data: []): void {
    let selectedCountry: string = this.route.snapshot.params['id'];    
    data.map((val: Country) => {
         val.id == parseInt(selectedCountry) 
          ? this.currentOlympicCountry = val 
          : Error('Olympic not found!');
      });
  }

  createDataToNgxCharts(olympic: Country) {
    let chartsData: Array<object> = [];
    let listYearMedals: Array<object>= []; 
    olympic.participations.map((val: Participation) => { 
      return listYearMedals.push({
        name: String(val.year),
        value: val.medalsCount
      })
    });
    chartsData.push({
      "name": olympic.country,
      "series": listYearMedals
    });
    
    return [...chartsData];
  }

  getTotalBumberMedals(data: Country): number {
    return data.participations.reduce(
      (sum: number, val: Participation) => {
        sum += val.medalsCount;
        return sum;
      }, 0);
  }
  getTotalNumberAthletes(data: Country): number {
    return data.participations.reduce(
      (sum: number, val: Participation) => {
        sum += val.athleteCount;
        return sum;
      }, 0);
  }

  onViewFaceSnap(): void {
    this.router.navigateByUrl(`dashboard`);
  }

  getColorCharts(): void {
    let colorItem: string | null = sessionStorage.getItem('colorItem');
    if (colorItem != null) {
      this.colorScheme.domain = [colorItem]
    } 
  }
}
