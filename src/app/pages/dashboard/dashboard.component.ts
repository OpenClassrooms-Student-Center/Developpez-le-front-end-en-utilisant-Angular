import { Component, OnInit, OnDestroy  } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { Router } from '@angular/router';
import { HeaderService } from '../../core/services/header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private olympicService: OlympicService,
    private headerService: HeaderService,
    private router: Router
  ) {}

  dataset: string[] = [];
  olympics: Olympic[] = [];
  numberOfJO = 0;
  numberOfCountries = 0;

 subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.olympicService.getOlympics().subscribe((olympics) => {
      this.olympics = olympics;
      this.numberOfCountries= olympics.length;
      this.setDataCharts(olympics);
      this.updateHeader();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log("unsubscribe");
  }

  onSelect(event: any): void {
    var olympic = this.olympics.find(olympic => olympic.country === event.name);
    this.router.navigateByUrl('detail/' + olympic?.id);
  }

 /**
 * set values country and medalsCount for chart
 * Set informations numberJO for Header
 */
  private setDataCharts(olympics : Olympic[] | undefined) {
    let dataChart : any[] = [];
    let totalMedals = 0;
    let yearOlympics : number[] = [];

    for (let olympic of olympics!) {
      totalMedals = olympic.participations.reduce((x,participation) => {
        if (!yearOlympics.includes(participation.year)) {
          yearOlympics.push(participation.year);
          this.numberOfJO++;
        }
        return x + participation.medalsCount;
      }, 0);
      var obj = {
        "name": olympic.country,
        "value": totalMedals
      }
      dataChart.push(obj);
    }
    this.dataset = [...dataChart];
  }

/**
 * Update values for header
 */
 private updateHeader() {
     this.headerService.setInfos(
       new Map<string, number>([
        ["Number of JOs", this.numberOfJO],
        ["Number of countries", this.numberOfCountries]
       ])
     );
     this.headerService.setTitle("Medals per Country");
  }
}
