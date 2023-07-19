import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, map, Observable, of, Subscription } from 'rxjs';
import { Olympic } from 'app/core/models/Olympic';
import { OlympicService } from 'app/core/services/olympic.service';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

/**
 * Initialize data to be stored 
  and to be returned as a pie chart.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[]> = of([]);
  private subscriptions: Subscription[] = [];
  public olympicsNumber!: number;
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        reverse: true,
      },
    },
  };

  constructor(private olympicService: OlympicService, private router: Router) {}

  /**
   * This event allows to go at country's detail page with an id
   * @param any
   */
  public detailCountry(event: any) {
    const index = event.active[0].index;
    const id = index + 1;
    this.router.navigate([`detail/${id}`]);
  }

  /**
   * Method executed on component initialization
   */
  ngOnInit(): void {
    this.updateChartData();
  }

/**
 * 
 * @returns 
 */
  public getOlympicCountries(): Observable<string[]> {
    return this.olympicService
      .getOlympics()
      .pipe(
        map((olympics: Olympic[]) => olympics.map((o: Olympic) => o.country))
      );
  }

  /**
   * 
   * @returns 
   */
  public getOlympicMedalCount(): Observable<number[]> {
    return this.olympicService
      .getOlympics()
      .pipe(
        map((olympics: Olympic[]) =>
          olympics.map((o: Olympic) =>
            o.participations.reduce(
              (accumulator, current) => accumulator + current.medalsCount,
              0
            )
          )
        )
      );
  }

  /**
   * 
   */
  public updateChartData(): void {
    const subscription = combineLatest([
      this.getOlympicCountries(),
      this.getOlympicMedalCount(),
    ]).subscribe(([country, medalCounts]) => {
      this.olympicsNumber = country.length;
      this.pieChartData = {
        labels: country,
        datasets: [
          {
            data: medalCounts,
            backgroundColor: [
              'rgb(149, 96, 101)',
              'rgb(184, 203, 231)',
              'rgb(137, 161, 219)',
              'rgb(121, 61, 82)',
              'rgb(151, 128, 161)',
            ],
            hoverOffset: 10,
          },
        ],
      };
    });
    this.subscriptions.push(subscription);
  }

  /**
   * Unsubscribe before component destruction
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
