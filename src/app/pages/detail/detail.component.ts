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
  numberOfEntries!: number
  totalNumberMedals!: number;
  totalNumberOfAthletes!: number;
  countryName!: string;
  // ngx-charts options
  ngxChartsData!: Array<object>;
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
    this.countryName = "Data doesn't exist"
    this.olympicService.getOlympics().pipe(
      map((value) => {
        if (typeof value === 'object') {
          this.getOlympicById(value);
          if (this.currentOlympicCountry != undefined) {
            this.ngxChartsData = 
              this.createDataToNgxCharts(this.currentOlympicCountry);
            this.totalNumberMedals = 
              this.getTotalNumberMedals(this.currentOlympicCountry);
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

  /*
  * Get the data of a slected olympic country
  */
  getOlympicById(data: []): void {
    let selectedCountry: string = this.route.snapshot.params['id'];    
    data.map((val: Country) => {
         val.id == parseInt(selectedCountry) 
          ? this.currentOlympicCountry = val 
          : Error('Olympic not found!');
      });
  }

  /* 
  * Create formated object to use it in ngx-charts
  */
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

  /*
  * get total number of medals for current country
  */
  getTotalNumberMedals(data: Country): number {
    return data.participations.reduce(
      (sum: number, val: Participation) => {
        sum += val.medalsCount;
        return sum;
      }, 0);
  }

  /*
  * get total number of athletes for current country
  */
  getTotalNumberAthletes(data: Country): number {
    return data.participations.reduce(
      (sum: number, val: Participation) => {
        sum += val.athleteCount;
        return sum;
      }, 0);
  }

  /*
  * navigation to go back dashboard
  */
  goBackDashbord(): void {
    this.router.navigateByUrl(`dashboard`);
  }

  /*
  * get color chart from session storage
  */
  getColorCharts(): void {
    let colorItem: string | null = sessionStorage.getItem('colorItem');
    if (colorItem != null) {
      this.colorScheme.domain = [colorItem];
    } 
  }
}
