import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { LegendPosition, ColorHelper, ScaleType } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private olympicService: OlympicService, private router: Router, private toastr: ToastrService) {}

  // Management of subscriptions
  private subscriptions: Subscription[] = [];

  //Initialization of screen data for the charts
  windowWidth = window.innerWidth;
  windowHeight =
    window.innerWidth <= 500 ? (window.innerHeight > 750 ? window.innerHeight - 200 : window.innerHeight ) : window.innerHeight;
    

  //Data initialization for the info bubbles
  pageTitle = 'Medals per Country';
  info1 = 'Number of JOs';
  numberOfJOs!: number;
  info2 = 'Number of countries';
  numberOfCountries!: number;

  // Observable initialization
  public olympics$: Observable<Olympic[]> = of([]);
  public medalsPerCountry$: Observable<{ name: string; value: number }[]> = of(
    []
  );

  // Pie chart options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  customColors = [
    { name: 'Italy', value: '#956065' },
    { name: 'Spain', value: '#b8cbe7' },
    { name: 'United States', value: '#89a1db' },
    { name: 'Germany', value: '#793d52' },
    { name: 'France', value: '#9780a1' },
  ];
  colorHelper = new ColorHelper(
    'cool',
    ScaleType.Linear,
    [0, 100],
    this.customColors
  );
  legendPosition: LegendPosition = LegendPosition.Below;
  legendTitle = '';
  maxLabelLength = 20;

  // Redirection to detail page when a country is selected
  onSelectCountry(event: { name: any }): void {
    this.router.navigate(['/detail', event.name]);
    console.log(event.name);
  }

  ngOnInit(): void {

    this.toastr.info('Click on the pie chart to see details on a specific country.');


    // Data loading
    this.olympics$ = this.olympicService.getOlympics();
    this.medalsPerCountry$ = this.olympicService.getMedalsPerCountry();

    // Values calculation of info bubbles
    this.subscriptions.push(
      this.olympicService.getCountries().subscribe((countries) => {
        this.numberOfCountries = countries.length;
      }),

      this.olympicService.getNumberOfJOs().subscribe((numberOfJOs) => {
        this.numberOfJOs = numberOfJOs;
      })
    );

    // Listen to resize events
    this.subscriptions.push(
      fromEvent(window, 'resize')
      .subscribe(() => {
        this.windowWidth = window.innerWidth;
        this.windowHeight =
        window.innerWidth <= 500 ? (window.innerHeight > 750 ? window.innerHeight - 200 : window.innerHeight ) : window.innerHeight;
      })
  );
}

  // Unsubscribe from all subscriptions
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
