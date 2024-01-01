import { Component, HostListener,  OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OlympicService } from '../../core/services/olympic.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-swimlane',
  templateUrl: './swimlane.component.html',
  styleUrls: ['./swimlane.component.scss']
})
export class SwimlaneComponent implements OnDestroy {
  countryName!: string;
  participationsCount!: number;
  totalMedals!: number;
  totalAthletes!: number;

  multi: any[] = [];
    view: [number, number] = [700, 300];

  legend = true;
  showLabels = true; // Si vous avez besoin de cette propriété
  animations = true; // Si vous avez besoin de cette propriété
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  yAxisLabel = 'Medals';
  timeline = true;

  colorScheme = 'cool';

  private paramSubscription: Subscription | undefined;
  private olympicDataSubscription: Subscription | undefined;
  private countrySeriesDataSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private router: Router ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.countryName = params.get('countryName')!;
      this.olympicService.getFormattedOlympics().subscribe(data => {
        const countryData = data.find(country => country.name === this.countryName);
        
        if (countryData) {
          this.participationsCount = countryData.participations.length;
          this.totalMedals = countryData.participations.reduce((sum: any, participation: { medalsCount: any; }) => sum + participation.medalsCount, 0);
          this.totalAthletes = countryData.participations.reduce((sum: any, participation: { athleteCount: any; }) => sum + participation.athleteCount, 0);
        }
      });
      
    });

    this.route.paramMap.subscribe(params => {
      this.countryName = params.get('countryName')!;
      this.olympicService.getCountrySeriesData().subscribe(data => {
        this.multi = data.filter(country => country.name === this.countryName);
      });
    });
    

  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const window = event.target as Window;
    if (window) {
      this.view = [window.innerWidth / 1.35, 100]; // Ajustez la division selon votre layout
    }
  }


  ngOnDestroy(): void {

    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if (this.olympicDataSubscription) {
      this.olympicDataSubscription.unsubscribe();
    }
    if (this.countrySeriesDataSubscription) {
      this.countrySeriesDataSubscription.unsubscribe();
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }

}
