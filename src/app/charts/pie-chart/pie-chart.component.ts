import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PieChart } from 'src/app/core/models/PieChart';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';

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
  countriesMedals: PieChart[] = [];

  private subscription: Subscription = new Subscription();

  /**
   * Constructs the PieChartComponent.
   * @param olympicService - The OlympicService for data retrieval.
   */
  constructor(private olympicService: OlympicService) { }

  /**
   * Initializes the component and loads initial data for the pie chart.
   */
  ngOnInit(): void {
    this.countriesMedals = this.olympicService.processDataForPieChart();
    console.log(this.countriesMedals);
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
