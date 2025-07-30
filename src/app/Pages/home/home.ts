import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Olympic } from '../../core/Models/Olympic';
import { OlympicService } from '../../core/Services/olympic.service';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartData } from '../../core/Models/PieChartData';
import { CommonModule } from '@angular/common';




// The HomeComponent displays a pie chart of Olympic countries and their medal counts.
// It retrieves the Olympic data from the service, processes it into pie chart data,  
// and allows navigation to detailed views of each country when a pie slice is clicked.
@Component({
  selector: 'app-home',
  imports: [NgxChartsModule, CommonModule],
  standalone: true,
  templateUrl: 'home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  olympics$!: Observable<Olympic[]>;
  pieData$!: Observable<PieChartData[]>;
  private destroy$ = new Subject<void>();
  numberOfJOs$!: Observable<number>;

  /** PieChart options */
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  width: number = Math.min(Math.max(window.innerWidth * 0.6, 300), 900);
  height: number = Math.max(Math.floor(window.innerHeight * 0.6), 400);


  constructor(private olympicService: OlympicService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.olympics$ = this.olympicService.getOlympics();
    this.pieData$ = this.getPieChartData(this.olympics$);

    // Calculate the number of unique years from the participations as an observable
    this.numberOfJOs$ = this.olympics$.pipe(
      map(olympics => {
        const allYears = olympics.flatMap(country => country.participations.map(pa => pa.year));
        return new Set(allYears).size;
      })
    );

  }

  // Unsubscribe from all observables when the component is destroyed
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Navigate to the country detail page when a pie slice is clicked
  onCountrySelect(event: PieChartData): void {
    this.router.navigateByUrl(`detail/${(event.name)}`);
  }

 
  private getPieChartData(olympics$: Observable<Olympic[]>): Observable<PieChartData[]> {
    return olympics$.pipe(
      map(countries =>
        countries.map(country => ({
          id: country.id,
          name: country.country,
          value: this.olympicService.totalMedalCalc(country.participations, 'medalsCount')
        }))
      )
    );
  }

}
