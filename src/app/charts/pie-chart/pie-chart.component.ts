import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PieChart } from 'src/app/core/models/PieChart';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { Subject, takeUntil } from 'rxjs';
import { OlympicEvent } from 'src/app/core/models/OlympicPieEvent';

/**
 * Component for displaying pie charts using ngx-charts.
 * This component visualizes Olympic medals data in a pie chart format.
 */
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnInit {
  /**
   * Defines the color scheme of the pie chart. The scheme is customizable and
   * consists of an array of hexadecimal color values.
   */
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#956065', '#793d52', '#89a1db', '#9780a1', '#bfe0f1', '#b8cbe7']
  };

  /**
   * Configures the display options of the pie chart, including whether to
   * show labels, the position of the legend, and whether to render the chart
   * as a doughnut.
   */
  gradient: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Right;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  arcWidth: number = 0.25;

  /**
   * Stores the data to be visualized in the pie chart, representing the
   * distribution of Olympic medals among countries.
   */
  countriesMedals: PieChart[] = [];

  private unsubscribe$ = new Subject<void>();

  /**
   * Initializes the PieChartComponent and injects dependencies for data retrieval.
   * @param olympicService The service to fetch and process Olympic data.
   */
  constructor(private olympicService: OlympicService) { }

  /**
   * Subscribes to the Olympic data on component initialization and updates
   * the pie chart data accordingly. Ensures that the component reacts to
   * changes in the Olympic data over time.
   */
  ngOnInit(): void {
    this.olympicService.olympics$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.countriesMedals = this.olympicService.processDataForPieChart();
    });
  }

  /**
   * Handles click events on elements of the pie chart, triggering
   * actions such as navigation or data updates based on the clicked element.
   * @param event The event object representing the clicked chart element.
   */
  onElementClick(event: OlympicEvent): void {
    this.olympicService.onSelect(event);
  }

  /**
   * Cleans up resources and subscriptions when the component is destroyed
   * to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
