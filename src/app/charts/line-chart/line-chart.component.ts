// Import statements
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Country } from 'src/app/core/models/Olympic';
import { MedalData } from 'src/app/core/models/MedalData';
import { EntriesMedalsAthletes } from 'src/app/core/models/EntriesMedalsAthletes';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  }

  medalsData: MedalData[] = [{
    name: '',
    series: []
  }];
  data: Country[] = [];
  elementSelectionne: string

  /**
   * Stores entries, medals, and athletes result.
   */
  entriesMedalsAthletesResult: EntriesMedalsAthletes = {
    entries: 0,
    medals: 0,
    athletes: 0
  };

  private subscription: Subscription = new Subscription();

  constructor(private olympicService: OlympicService) {
    this.elementSelectionne = this.olympicService.elementSelectionne;
  }

  /**
   * Initializes the component and subscribes to Olympic data.
   */
  ngOnInit(): void {
    this.subscription.add(
      this.olympicService.getOlympics().pipe(
        catchError((error) => {
          console.error('There was an error!', error);
          return [];
        })
      ).subscribe((countries: Country[]) => {
        this.data = countries;
        this.entriesMedalsAthletesResult = this.olympicService.processEntriesMedalsAthletes(this.data, this.elementSelectionne);
        this.medalsData = this.olympicService.processCountryMedalsPerDate(this.data, this.elementSelectionne);
      })
    );
  }

  /**
   * OnDestroy lifecycle hook to clean up resources.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
