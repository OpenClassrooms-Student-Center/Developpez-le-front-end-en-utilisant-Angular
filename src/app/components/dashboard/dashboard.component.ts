import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Subscription} from "rxjs";
import {OlympicService} from "../../core/services/olympic.service";
import {DashboardChartData} from "../../core/models/DashboardChartData";
import {Olympic} from "../../core/models/Olympic";
import {Participation} from "../../core/models/Participation";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{

  // Observable subscription / unsubscription object.
  subscription !: Subscription;
  // Dashboard chartDataTable
  dashboardDatas : DashboardChartData[] = [];

  constructor(private olympicService : OlympicService) {
  }

  ngOnInit(): void {
    this.subscription = this.olympicService.getOlympics().pipe(
      map(
        olympics => {
          for (const olympic of olympics){
            this.dashboardDatas.push(this.dashboardDataMapper(olympic));
          }
        }
      )
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  dashboardDataMapper(olympic : Olympic) : DashboardChartData {
    let totalMedalCount = 0;
    for (let participation of olympic.participations){
      totalMedalCount += participation.medalsCount;
    }
    return new DashboardChartData(olympic.country, totalMedalCount);
  }





}
