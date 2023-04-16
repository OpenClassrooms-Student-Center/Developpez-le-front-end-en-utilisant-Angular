import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { wording } from 'src/app/utils/wording';
import { getTotalMedals, getTotalAthletes, colors, backgrounds } from 'src/app/utils/data-utils';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public wording = wording;
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
      // We use this empty structure as a placeholder for dynamic theming.
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

  constructor(private olympicService:OlympicService,
              private router:Router,
              private activeRoute:ActivatedRoute) {}

  ngOnInit():void {
    this.olympic = { id: 0, country: "Data loading...", participations: []};
    const routeId:number = this.activeRoute.snapshot.params['id'];
    let numberOfOlympics = 0;
    this.olympicService.getDataLength().subscribe(data => numberOfOlympics = data);
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
    this.olympicService.getOlympicById(routeId).subscribe((data)=> {
      this.olympic = data;
      this.olympicService.getErrorMessages().forEach(errorMessage => this.errors.push(errorMessage));
      this.totalMedals = getTotalMedals(data);
      this.totalAthletes = getTotalAthletes(data);
      this.loadChartData(data);
      this.dataLoaded = true;
    });
    
  }

  loadChartData(olympic: Olympic) {
    this.color = colors[olympic.id - 1];
    this.background = backgrounds[olympic.id - 1];
    let max = 0;
    olympic.participations.forEach((participation) => {
      if (max < participation.medalsCount) {
        max = participation.medalsCount;
      }
      this._max = max +15;
      this.data.push(participation.medalsCount);
      this.labels.push(participation.city + " " + participation.year.toString());
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
      elements: {
        line: {
          tension: 0.3
        }
      },
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
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
        legend: { display: false }
      } 
    }
  }
}
