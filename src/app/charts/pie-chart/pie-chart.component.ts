import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PieChart } from 'src/app/core/models/PieChart';
import { Country } from 'src/app/core/models/Olympic';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Component for displaying pie charts using ngx-charts.
 */
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnInit {

  /**
   * Color scheme configuration for the pie chart.
   */
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#956065', '#793d52', '#89a1db', '#9780a1', '#bfe0f1', '#b8cbe7']
  };

  /**
   * Configuration options for the pie chart.
   */
  gradient: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Right;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  arcWidth: number = 0.25;
  animations: boolean = false;

  /**
   * Data for the pie chart.
   */
  data: Country[] = [];
  countriesMedals: PieChart[] = [];

  private subscription: Subscription = new Subscription();

  /**
   * Constructor to inject the OlympicService.
   * @param olympicService - Service to fetch Olympic data.
   */
  constructor(private olympicService: OlympicService) { }

  /**
   * OnInit lifecycle hook to load initial data for the pie chart.
   */
  ngOnInit(): void {
    this.subscription.add(
      this.olympicService.getOlympics().pipe(
        catchError((error) => {
          console.error('There was an error!', error);
          return [];
        }),
      ).subscribe((countries: Country[]) => {
        this.data = countries;
        this.countriesMedals = this.olympicService.processDataForPieChart(this.data);
      })
    );
  }

  /**
   * Handles the click event on a chart element.
   * @param event - The click event.
   */
  onElementClick(event: any): void {
    this.olympicService.onSelect(event);
  }

  /**
   * OnDestroy lifecycle hook to clean up resources.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
