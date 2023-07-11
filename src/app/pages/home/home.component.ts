import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public olympics$: Observable<Olympic[]> = of([]);
  public olympics: Olympic[] = [];


  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  }
  public pieChartCountries: Array<string> = [];
  public countriesMedals: Array<number> = [];
  public pieChartDatasets : Array<{data: Array<number>}>= [];
  public pieChartLegend = false;
  public pieChartPlugins = [];

  currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;



  constructor(
     private olympicService: OlympicService,
     private responsiveService: ResponsiveService
  ) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics$()

    this.olympicService.getOlympics().subscribe((olympicData) => {
      this.olympics = olympicData.map((olympic) => {
        return olympic;
      })
      
      if(this.olympics.length>0) {
        this.pieChartCountries = this.olympics.map((country) => { return country.country })
        this.olympics.map((medals) => {
          const medalsParticipations = medals.participations.map((participations) => {
            return participations.medalsCount;
          }).reduce((prev,curr) => prev+curr);
          this.countriesMedals.push(medalsParticipations)
        })
        this.pieChartDatasets = [{ data: this.countriesMedals }]
      }
    });

    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
    });
  }

}
