// Import statements
import { Component, OnInit, ViewEncapsulation, Input, ChangeDetectorRef } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Country } from 'src/app/core/models/Olympic';
import { MedalData } from 'src/app/core/models/MedalData';
import { EntriesMedalsAthletes } from 'src/app/core/models/EntriesMedalsAthletes';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * LineChartComponent displays a line chart with medals data for a selected country.
 */
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit {
  // Input property for chart title
  @Input() title: string = '';

  // Chart options
  legend: boolean = false;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = '';
  autoScale: boolean = true;
  timeline: boolean = true;
  tooltipDisabled: boolean = true;
  animations: boolean = false;
  showGridLines: boolean = true;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  customYScaleTicks: number = 5;

  // Color scheme for the chart
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  }

  // Data arrays
  medalsData: MedalData[] = [{
    name: '',
    series: []
  }];
  data: Country[] = [];

  // Selected element name
  elementSelectionne: string;

  // Loading indicator
  isLoading: boolean = false;

  /**
   * Stores entries, medals, and athletes result.
   */
  entriesMedalsAthletesResult: EntriesMedalsAthletes = {
    entries: 0,
    medals: 0,
    athletes: 0
  };

  private unsubscribe$ = new Subject<void>();
  private subscription: Subscription = new Subscription();

  /**
   * Constructs the LineChartComponent.
   * @param olympicService - The OlympicService for data retrieval.
   * @param changeDetectorRef - The ChangeDetectorRef for manual change detection.
   */
  constructor(private olympicService: OlympicService, private changeDetectorRef: ChangeDetectorRef) {
    this.elementSelectionne = this.olympicService.elementSelectionne;
  }

  /**
   * Initializes the component and subscribes to Olympic data.
   */
  ngOnInit(): void {
    // Subscribe to isLoading$ observable from OlympicService
    this.olympicService.isLoading$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    // Subscribe to elementSelectionne$ observable from OlympicService
    this.olympicService.elementSelectionne$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (elementSelectionne) => {
        this.elementSelectionne = elementSelectionne;
        this.changeDetectorRef.detectChanges();
        console.log(this.elementSelectionne);
      },
      error: (error) => {
        console.error('Error fetching elementSelectionne:', error);
      }
    });

    // Subscribe to olympics$ observable from OlympicService
    this.olympicService.olympics$.subscribe(() => {
      console.log(this.elementSelectionne);
      this.entriesMedalsAthletesResult = this.olympicService.processEntriesMedalsAthletes(this.elementSelectionne);
      console.log(this.elementSelectionne);
      console.log(this.entriesMedalsAthletesResult);
      this.medalsData = this.olympicService.processCountryMedalsPerDate(this.elementSelectionne);
      console.log(this.medalsData);
    });
  }

  /**
   * OnDestroy lifecycle hook to clean up resources.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
