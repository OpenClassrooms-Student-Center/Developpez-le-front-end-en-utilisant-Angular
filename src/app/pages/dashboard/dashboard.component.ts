import { Component, OnInit, OnDestroy  } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public view: [number, number] = [0,0];
  public dataChart: {name: string, value: number}[] = [];
  private olympics: Olympic[] = [];
  private numberOfJO : number = 0;
  private numberOfCountries : number = 0;
  public infosHeaders: Map<string, number> = new Map<string, number>();
  private subscription!: Subscription;

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show().then(x => {
      this.subscription = this.olympicService.getOlympics().subscribe((olympics) => {
        this.olympics = olympics;
        this.numberOfCountries= olympics.length;
        this.setDataCharts(olympics);
        this.updateHeader();
      });
    });
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

  /**
  * Run page detail when element selected
  */
  onSelect(event: {name : string, value : string}): void {
    var olympic = this.olympics.find(olympic => olympic.country === event.name);
    this.router.navigateByUrl('detail/' + olympic?.id);
  }

  /**
  * Resize chart when window changes
  */
  onResize(event : Event): void {
   const target = event.target as Window;
      this.view = [target.innerWidth / 1.1, target.innerHeight/ 2];
  }

 /**
 * set values country and medalsCount for chart
 * Set informations numberJO for Header
 */
  private setDataCharts(olympics : Olympic[] | undefined): void {
    let totalMedals = 0;
    let yearOlympics : number[] = [];

    if (olympics && olympics.length !== 0) {
      this.dataChart = olympics.map((olympic : Olympic) => {
        totalMedals = olympic.participations.reduce((x,participation) => {
          if (!yearOlympics.includes(participation.year)) {
            yearOlympics.push(participation.year);
            this.numberOfJO++;
          }
          return x + participation.medalsCount;
        }, 0);
        return {
           name: olympic.country,
           value: totalMedals
         }  ;
      });
    }
  }

  /**
  * Update values for header
  */
  private updateHeader(): void {
    this.infosHeaders = new Map<string, number>([
      ["Number of JOs", this.numberOfJO],
      ["Number of countries", this.numberOfCountries]
    ]);
  }
}
