import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartEvent } from 'chart.js';
import { Observable, Subscription, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HeaderComponent } from 'src/app/pages/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {

  olympics$!: Observable<Array<Olympic> | null>;
  pieChart!: Chart;
  mLabels: Array<string> = [];
  mMedals: Array<number> = [];
  mNumberOfGames: number = 0;
  subscription!: Subscription;
  data!: Subscription;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.data = this.olympicService
      .loadInitialData()
      .subscribe(() => this.setInitialData());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.data.unsubscribe();
  }

  /**
   * Creates an empty pie chart, responsive.
   * Creates the click event that lets navigate to specific chosen country
   *
   * @remarks
   * Requires {@link chart.js/auto} and {@link chartjs-plugin-datalabels}
   */
  createChart(): void {
    this.pieChart = new Chart('MyChart', {
      plugins: [ChartDataLabels],
      type: 'pie',
      data: {
        labels: this.mLabels,
        datasets: [
          {
            data: this.mMedals,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,

        onClick: (e: ChartEvent) => {
          const nativeEvent = e.native || e;
          //Need to use this nasty getElementsAtEventForMode to get the index for the click (got data from chart.js API)
          try {
            this.router.navigateByUrl(
              '/' +
                this.pieChart.getElementsAtEventForMode(
                  nativeEvent as unknown as MouseEvent,
                  'nearest',
                  { intersect: true },
                  true
                )[0].index
            );
            //Used this catch to not throw error when clicked on empty space : no problem at all
          } catch {}
        },
        plugins: {
          legend: {
            display: false,
          },
          datalabels:{
            display: false,
            color: '007bff',
            align: 'end',
            anchor: 'end',
            padding: 25,
            font:{
              size: 16,
              weight: 'bold',
            },
            labels:{
              value:{
                color: 'blue',
              }
            }
          }
        },
      },
    });
  }

  /**
   * Populates the empty pie chart with correct data
   *
   * @param olympics - The array of olympics retrieved by service
   */
  modifyChartData(olympics: Array<Olympic> | null): void {
    if (!olympics) {
      return;
    }
    for (let olympic of olympics) {
      this.mLabels.push(olympic.country);
      this.mMedals.push(this.olympicService.countMedals(olympic));
      this.mNumberOfGames = this.olympicService.countUniqueGames(olympic);
    } 
    this.createChart();
    }

  /**
   * Sets initial data
   *
   * @remarks
   * This embedding lets it do so modifyChart waits for initialData before creating new Chart
   */
  setInitialData() : void {
    this.olympics$ = this.olympicService.getOlympics();
    this.subscription = this.olympics$.subscribe((value) => {
      this.modifyChartData(value);
    });
  }
}
