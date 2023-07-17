import { Component, OnDestroy, OnInit } from '@angular/core';
import { Olympic } from 'app/core/models/Olympic';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from 'app/core/services/olympic.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Participation } from 'app/core/models/Participation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  olympic!: Olympic;
  totalMedals!: number;
  totalAthletes!: number;
  private subscriptions: Subscription[] = [];
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };

  
 public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0,
      },
    },
    scales: {
      y: {
        position: 'left', 
        suggestedMin: 0,
        suggestedMax: 140,
      },
    },

    plugins: {
      legend: { display: true }, 
    },
  };

  public lineChartType: ChartType = 'line'; 

  constructor(private olymmpicService: OlympicService, private route: ActivatedRoute, private router: Router) {}


  returnToHomePage() {
    this.router.navigateByUrl('');
  }

  ngOnInit(): void {
    const olympicCountry = +this.route.snapshot.params['id'];
    const subscription = this.olymmpicService
      .getOlympicsById(olympicCountry)
      .subscribe((olympics: Olympic[]) => {
        if (olympics && olympics.length) {
          this.olympic = olympics[0]; 
        } else {
          this.returnToHomePage();
        }
      });
    this.subscriptions.push(subscription);
    if (this.olympic) {
      this.lineChartData = {
        datasets: [
          {
            data: this.olympic.participations.map((p) => {
              return p.medalsCount;
            }),
            label: 'Nombre de médailles obtenues par année',
            backgroundColor: 'yellow',
            borderColor: 'rgba(4, 131, 143, 1)',
            pointBackgroundColor: 'rgba(4, 131, 143, 1)',
            pointBorderColor: 'yellow',
            pointHoverBackgroundColor: 'yellow',
            pointHoverBorderColor: 'rgba(4, 131, 143, 1)',
          },
        ],
        labels: this.olympic.participations.map((p: Participation) => {
          return p.year;
        }),
      };
      this.totalMedals = this.olympic.participations.reduce(
        (accumulator, current) => accumulator + current.medalsCount,0
      );
      this.totalAthletes = this.olympic.participations.reduce(
        (accumulator, current) => accumulator + current.athleteCount,0
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}


