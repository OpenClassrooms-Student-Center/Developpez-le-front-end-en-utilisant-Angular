import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { wording } from 'src/app/utils/wording';
import { getTotalMedals, getTotalAthletes, colors, backgrounds, screenSizes } from 'src/app/utils/data-utils';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subject, takeUntil } from 'rxjs';
import { Screen } from 'src/app/core/models/Screen';
import { ResponsiveService } from 'src/app/core/services/responsive.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  public wording = wording;
  private _destroyed = new Subject<void>();
  private _size:string = 'Unknown';
  private _isPortrait:boolean = true;
  private _screenSizes = screenSizes;
  public screen!:Screen;
  public olympic!:Olympic;
  public totalMedals:number = 0;
  public totalAthletes:number = 0;
  public dataLoaded:boolean = false;
  public error:boolean = false;
  public errors:string[] = [];

  public color:string = '#000';
  public background:string = '#fff';

  public lineChartType: ChartType = 'line';
  public data:number[] = [];
  public labels:string[] = [];
  private _max:number = 100;
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: wording.page.details.medalsPerParticipation,
        backgroundColor: this.background,
        borderColor: this.color,
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        position: 'left',
        grid: {
          color: 'rgba(0,0,0,0.3)',
        },
        ticks: {
          color: '#000000',
          stepSize: 5
        }
      }
    },
    plugins: {
      legend: { display: false }
    } 
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private _olympicService:OlympicService,
              private _responsive: ResponsiveService,
              private _activeRoute:ActivatedRoute,
              private _router:Router) {
                this._activeRoute.params.subscribe(params => {
                  let routeId = params['id'];
                  this.olympic = { id: 0, country: "Data loading...", participations: []};
                  let numberOfOlympics = 0;
                  this._olympicService.getDataLength().subscribe(data => numberOfOlympics = data);
                  if (isNaN(routeId) || routeId <=0 || routeId > numberOfOlympics) {
                    if (isNaN(routeId)) {
                      let errorMessage = "Id: " + routeId + " is Not a Number!";
                      if (!this.errors.includes(errorMessage)) {
                        this.errors.push(errorMessage);
                      }
                    }
                    let errorMessage = wording.page.details.notFound('id', routeId);
                    if (!this.errors.includes(errorMessage)) {
                      this.errors.push(errorMessage);
                    }
                    this.olympic = { id: -1, country: "Error!", participations: []};
                    this.error = true;
                    this.dataLoaded = true;
                    return;
                  }
                  this._olympicService.getOlympicById(routeId)
                  .pipe(takeUntil(this._destroyed))
                  .subscribe((data)=> {
                    this.olympic = data;
                    this._olympicService.getErrorMessages().forEach(errorMessage => this.errors.push(errorMessage));
                    this.totalMedals = getTotalMedals(data);
                    this.totalAthletes = getTotalAthletes(data);
                    this.loadChartData(data);
                    this.error = false;
                    this.dataLoaded = true;
                  });
                });
              }

  ngOnInit():void {
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
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  loadChartData(olympic: Olympic):void {
    this.color = colors[olympic.id - 1];
    this.background = backgrounds[olympic.id - 1];
    let max = 0;
    olympic.participations.forEach((participation) => {
      if (max < participation.medalsCount) {
        max = participation.medalsCount;
      }
      this._max = max +15;
      this.data.push(participation.medalsCount);
      this.labels.push(participation.year.toString());
    });
    this.lineChartData = {
      datasets: [
        {
          data: this.data,
          label: wording.page.details.medals,
          backgroundColor: this.background,
          borderColor: this.color,
          pointBackgroundColor: this.color,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        }
      ],
      labels: this.labels
    };
    this.lineChartOptions = {
      responsive: true,
      elements: {
        line: {
          tension: 0.3
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: this._max,
          position: 'left',
          grid: {
            color: 'rgba(0,0,0,0.3)',
          },
          ticks: {
            color: this.color,
            stepSize: 5
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          usePointStyle: true,
          callbacks: {
            title: (context) => {
              let title = this.olympic.participations[context[0]?.dataIndex].city + " " + context[0]?.label;
              return title;
            },
            labelPointStyle: (context) => { 
              const icon = new Image(15, 15);
              icon.src = '../../../../assets/images/medal-icon.png';
              return { pointStyle: icon, rotation: 0 }
            }
          }
        }
      } 
    }
  }

  resetChartData():void {
    this.data = [];
    this.labels = [];
  }

  previous():void {
    let previousId = +this._activeRoute.snapshot.params['id'] - 1;
    if (previousId < 1) {
      previousId = 5;
    }
    this.resetChartData();
    this._router.navigate(['/details', `${previousId}`]);
  }

  next():void {
    let nextId = +this._activeRoute.snapshot.params['id'] + 1;
    if (nextId > 5) {
      nextId = 1;
    }
    this.resetChartData();
    this._router.navigate(['/details', `${nextId}`]);
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

  get chartBox() {
    return { 'chart-box':true, 'small-chart-box': this.screen?.isSmall, 'medium-chart-box': this.screen?.isMedium, 'large-chart-box': this.screen?.isLarge }
  }

  get canvas() {
    return { 'small-chart': this.screen?.isSmall, 'medium-chart': this.screen?.isMedium, 'large-chart': this.screen?.isLarge }
  }

  get actions() {
    return { 'actions-container': true }
  }

  get errorClass() {
    return { 'error': true, 'small-error': this.screen?.isSmall }
  }
  
}
