import { Component, OnInit, OnDestroy  } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

export class Events {
  private _name! : string;
  private _value! : string;

  get name() : string {
    return this._name;
  }

  set name(num1:string) {
    this._name = num1;
  }
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  view: [number, number] = [0,0];
  dataset: string[] = [];
  dataChart: {name: string, value: number}[] = [];
  olympics: Olympic[] = [];
  numberOfJO : number = 0;
  numberOfCountries : number = 0;
  infosHeaders: Map<string, number> = new Map<string, number>();


 subscription!: Subscription;

  ngOnInit(): void {
    this.spinner.show();
    console.log("spinner activated");

    this.subscription = this.olympicService.getOlympics().subscribe((olympics) => {
      this.olympics = olympics;
      this.numberOfCountries= olympics.length;
      this.setDataCharts(olympics);
      this.updateHeader();
      this.spinner.hide();
      console.log("spinner desactivated");
    });
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

  onSelect(event: Events): void {
    var olympic = this.olympics.find(olympic => olympic.country === event.name);
    this.router.navigateByUrl('detail/' + olympic?.id);
  }

  onResize(event : Event) {
   const target = event.target as Window;
      this.view = [target.innerWidth / 1.1, target.innerHeight/ 2];
  }

 /**
 * set values country and medalsCount for chart
 * Set informations numberJO for Header
 */
  private setDataCharts(olympics : Olympic[] | undefined) {
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
 private updateHeader() {
   this.infosHeaders = new Map<string, number>([
            ["Number of JOs", this.numberOfJO],
            ["Number of countries", this.numberOfCountries]
           ]);
  }
}
