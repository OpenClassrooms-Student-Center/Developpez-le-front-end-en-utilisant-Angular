import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { Subject, takeUntil } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { backgrounds, colors, screenSizes } from 'src/app/utils/data-utils';
import { Screen } from 'src/app/core/models/Screen';
import { wording } from 'src/app/utils/wording';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public wording = wording;
  private _destroyed = new Subject<void>();
  private _size:string = 'Unknown';
  private _isPortrait:boolean = true;
  private _screenSizes = screenSizes;
  public screen!:Screen;
  public participations:number = 0;
  public countries:string[] = [];
  private _medalsPerCountry: number[] = [];
  public olympics: Olympic[] = [];
  public dataLoaded:boolean = false;
  public chartType: ChartConfiguration<'doughnut'>['type'] = 'doughnut';
  public chartPlugins = [ DatalabelsPlugin ];
  public chartData: ChartData<'doughnut', number[], string | string[]> | undefined = undefined;
  public chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        display: false,
        position: 'left',
      },
      tooltip: {
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            let label = wording.page.details.medals + ": " + context.formattedValue;
            return label;
          },
          labelPointStyle: (context) => { 
            const icon = new Image(15, 15);
            icon.src = '../../../../assets/images/medal-icon.png';
            return { pointStyle: icon, rotation: 0 }
          }
        }
      },
      datalabels: {
        formatter: (_value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
        font: {
          size: 18,
          family: 'Helvetica'
        }
      },
    },
    cutout: '35%'
  };

  constructor(
    private _responsive: ResponsiveService,
    private _olympicService: OlympicService,
    private _router:Router) {}

  ngOnInit(): void {
    this._responsive.observeScreenSize()
    .pipe(takeUntil(this._destroyed))
    .subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this._size = this._screenSizes.get(query) ?? 'Unknown';
          this.screen = new Screen(this._size, this._isPortrait);
        }
      }
    });
    this._responsive.observeOrientation()
    .pipe(takeUntil(this._destroyed))
    .subscribe(result => { 
      this._isPortrait = result.matches;
      this.screen = new Screen(this._size, this._isPortrait);
    });
    this._olympicService.getAsyncOlympics()
    .pipe(takeUntil(this._destroyed))
    .subscribe((data)=> {
      this.olympics = data;
      this.olympics.forEach((olympic)=> { 
        this.countries.push(olympic.country);
        let medalsCount:number = 0;
        olympic.participations.forEach((participation) => {
          medalsCount += participation.medalsCount;
        });
        this._medalsPerCountry.push(medalsCount);
      });
      this.chartData = {
        labels: this.countries,
        datasets: [ {
          data: this._medalsPerCountry,
          datalabels: {
            color: colors
          },
          backgroundColor: backgrounds,
          hoverBorderColor: colors
        } ],
      }
      this.participations = this.olympics[0]?.participations.length;
      if (isNaN(this.participations)) {
        this.participations = 0;
      }
      this.dataLoaded = true;
    });
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  chartClicked(event:any):void {
    let routeId = event.active[0]?.index + 1;
    this._router.navigateByUrl('/details/' + routeId);
  }

  get pageContainer() {
    return { 'page-container':true, 'small-page-container': this.screen?.isSmall, 'medium-page-container': this.screen?.isMedium, 'large-page-container': this.screen?.isLarge }
  }

  get statistics() {
    return { 'statistics': true, 'small-statistics': this.screen?.isSmall, 'medium-statistics': this.screen?.isMedium, 'large-statistics': this.screen?.isLarge }
  }

  get statisticsContent() {
    return { 'statistics-content':true, 'small-stat-content': this.screen?.isSmall, 'medium-stat-content': this.screen?.isMedium, 'large-stat-content': this.screen?.isLarge }
  }

  get pageTitle() {
    return { 'page-title':true, 'small-page-title': this.screen?.isSmall, 'medium-page-title': this.screen?.isMedium, 'large-page-title': this.screen?.isLarge }
  }

  get chartStyle() {
    return { 'chart-container': true, 'smallChart': this.screen?.isSmall, 'mediumChart': this.screen?.isMedium, 'largeChart': this.screen?.isLarge }
  }
}
