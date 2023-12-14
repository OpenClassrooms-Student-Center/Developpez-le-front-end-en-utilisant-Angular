import { Component, OnInit, ViewChild, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
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
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  view!: [number, number];

  // Color scheme configuration for the pie chart.
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#956065', '#793d52', '#89a1db', '#9780a1', '#bfe0f1', '#b8cbe7']
  };

  // Configuration options for the pie chart.
  gradient: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Right;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  arcWidth: number = 0.25;

  // Data for the pie chart.
  data: Country[] = [];
  countriesMedals: PieChart[] = [];

  /**
   * Constructor to inject the OlympicService and ChangeDetectorRef.
   * @param olympicService - Service to fetch Olympic data.
   * @param cdr - Change detector reference.
   */
  constructor(private olympicService: OlympicService, private cdr: ChangeDetectorRef) { }

  /**
   * OnInit lifecycle hook to load initial data for the pie chart.
   */
  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe((countries: Country[]) => {
      this.data = countries;
      this.countriesMedals = this.olympicService.processDataForPieChart(this.data);
    });
  }

  /**
   * Lifecycle hook that is called after Angular has fully initialized a component's view.
   */
  ngAfterViewInit() {
    this.updateChartSize();
    this.cdr.detectChanges();
  }

  /**
   * Listener for window resize events to update the chart size.
   */
  @HostListener('window:resize')
  onResize() {
    this.updateChartSize();
  }

  /**
   * Updates the size of the chart based on its container.
   */
  private updateChartSize() {
    const element = this.chartContainer.nativeElement;
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    this.view = [width, height];
  }

  /**
   * Handles the selection event on the pie chart.
   * @param event - The event object containing details of the selected segment.
   */
  onSelect(event: any): void {
    console.log('Segment sélectionné:', event);
  }
}
