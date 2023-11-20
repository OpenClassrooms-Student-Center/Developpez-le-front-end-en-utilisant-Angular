import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Observable, of, Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartDetail } from 'src/app/core/viewmodels/ChartDetail';
import { OlympicMedalsCount } from 'src/app/core/viewmodels/OlympicMedalsCount';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[]> = of([]);
  olympics: Olympic[] = [];
  currentCountry: Olympic | undefined;
  currentCountryId: number | undefined;
  olympicMedalsCounts: OlympicMedalsCount[] = [];
  chartDetails: ChartDetail[] = [];
  numberOfEntries: number = 0;
  numberOfMedals: number = 0;
  numberOfAthletes: number = 0;
  subscription: Subscription | undefined;
  routeSubscription: Subscription | undefined;

  currentTitle: string = '';
  numberOfEntriesLabel: string = '';
  numberOfMedalsLabel: string = '';
  numberOfAthletesLabel: string = '';
  numberOfEntriesText: string = '';
  numberOfMedalsText: string = '';
  numberOfAthletesText: string = '';
  infoMessage: string = '';

  //Line chart properties --------------------------------------
  view: [number, number] = [700, 300];

  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Number of medals';
  timeline: boolean = true;

  colorScheme: Color = {
    domain: ['#A10A28'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage'
  };
  //-------------------------------------------------------------

  constructor(private route: ActivatedRoute, private router: Router, private olympicService: OlympicService) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => this.currentCountryId = params['id']);
    this.olympics$ = this.olympicService.getOlympics();
    this.subscription = this.olympics$.subscribe({
      next: olympicList => {
        this.olympics = olympicList;
        this.setPage();
      },
      error: () => {
        this.infoMessage = "Country data loading error";
      },
    });
  }

  setPage(): void {
    if (this.olympics.length > 0 && this.currentCountryId) {
      this.currentCountry = this.olympicService.getOlympicById(this.currentCountryId, this.olympics);
      if (this.currentCountry) {
        this.setValues();
        this.setChildrenComponentValues();
        this.infoMessage = this.currentCountry.country + " data loaded";
      }
      else {
        this.router.navigateByUrl(`notfound`);
      }
    }
  }

  setValues(): void {
    this.setOlympicMedalsCounts();
    this.setChartDetails();
    this.setNumberOfEntries();
    this.setNumberOfMedals();
    this.setNumberOfAthletes();
  }

  setChildrenComponentValues(): void {
    if (this.currentCountry) {
      this.currentTitle = this.currentCountry.country;
    }
    this.numberOfEntriesLabel = 'Number of Entries';
    this.numberOfMedalsLabel = 'Number of Medals';
    this.numberOfAthletesLabel = 'Number of Athletes';
    this.numberOfEntriesText = this.numberOfEntries.toString();
    this.numberOfMedalsText = this.numberOfMedals.toString();
    this.numberOfAthletesText = this.numberOfAthletes.toString();
  }

  // This method takes values from Olympic set to create a set of values with a string and a number.
  setOlympicMedalsCounts(): void {
    this.olympicMedalsCounts = [];
    if (this.currentCountry) {
      this.currentCountry.participations.forEach(p => {
        this.olympicMedalsCounts.push({
          name: p.year.toString(),
          value: p.medalsCount
        });
      });
    }
  }

  // The line chart needs a set of values. Each value must contain a name (string) attribute, a set of values named series with each one that contains a name and a value.
  // This method takes values from Olympic set to create a set of values to insert into the line chart.
  setChartDetails(): void {
    this.chartDetails = [];
    if (this.currentCountry) {
      this.chartDetails.push(
        {
          name: this.currentCountry.country,
          series: this.olympicMedalsCounts
        });
    }
  }

  setNumberOfEntries(): void {
    if (this.currentCountry) {
      this.numberOfEntries = this.olympicService.getNumberOfEntriesByOlympicId(this.currentCountry.id, this.olympics);
    }
  }

  setNumberOfMedals(): void {
    if (this.currentCountry) {
      this.numberOfMedals = this.olympicService.getMedalsCountByOlympicId(this.currentCountry.id, this.olympics);
    }
  }

  setNumberOfAthletes(): void {
    if (this.currentCountry) {
      this.numberOfAthletes = this.olympicService.getNumberOfAthletesByOlympicId(this.currentCountry.id, this.olympics);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
