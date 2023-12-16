import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Subscription} from "rxjs";
import {OlympicService} from "../../core/services/olympic.service";
import {DashboardChartData} from "../../core/models/DashboardChartData";
import {Olympic} from "../../core/models/Olympic";
import {Participation} from "../../core/models/Participation";
import {ColorHelper, NgxChartsModule} from '@swimlane/ngx-charts';

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

  /*
  Variables ngx-chart
   */
  showLegend : boolean = false;
  showLabels : boolean = true;
  trimLabels : boolean = false;

  constructor(private olympicService : OlympicService) {
  }

  ngOnInit(): void {
    this.subscription = this.olympicService.getOlympics().pipe(
      map(
        olympics => {
          this.dashboardDatas = this.dashboardDataMapper(olympics);
        }
      )
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Méthode de mappage des données d'un tableau d'Olympic pour l'affichage dans le graphique dashBoard
   * @param olympics les données à mapper
   * @return un objet de type DashboardChartData pour l'affichage avec ngx-charts
   */
  dashboardDataMapper(olympics : Olympic[]) : DashboardChartData[] {
    let results: DashboardChartData[] = [];
    for (let olympic of olympics){
      let totalMedalCount = 0;
      for (let participation of olympic.participations){
        totalMedalCount += participation.medalsCount;
      }
      results.push(new DashboardChartData(olympic.id, olympic.country, totalMedalCount));
    }
    return results;
  }

  /*
  Méthodes evenements Ngx-Charts
   */

  onSelect(data : any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data : any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data : any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }





}
