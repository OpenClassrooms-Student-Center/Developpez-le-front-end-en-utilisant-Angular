import { Component, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PieChart } from 'src/app/core/models/PieChart';
import { Country } from 'src/app/core/models/Olympic';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';

/**
 * Component for displaying pie charts using ngx-charts.
 */
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  // View dimensions for the pie chart.
  view: [number, number] = [700, 400];

  // Color scheme configuration for the pie chart.
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5']
  };

  // Configuration options for the pie chart.
  gradient: boolean = false;
  showLegend: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Right;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  arcWidth: number = 0.25;

  // Data for the pie chart.
  data: Country[] = [];
  countriesMedals: PieChart[] = [];

  /**
   * Constructor to inject the OlympicService.
   * @param olympicService - Service to fetch Olympic data.
   */
  constructor(private olympicService: OlympicService) { }

  /**
   * Handles the selection event on the pie chart.
   * @param event - The event object containing details of the selected segment.
   */
  onSelect(event: any): void {
    console.log('Segment sélectionné:', event);
  }

  /**
   * OnInit lifecycle hook to load initial data for the pie chart.
   */
  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe((countries: Country[]) => {
      this.data = countries;
      this.countriesMedals = this.olympicService.processDataForPieChart(this.data);
    });
  }
}
