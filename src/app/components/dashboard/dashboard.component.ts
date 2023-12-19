import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Subscription} from "rxjs";
import {OlympicService} from "../../core/services/olympic.service";
import {ChartData} from "../../core/models/ChartData";
import {Olympic} from "../../core/models/Olympic";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{

  // Observable subscription / unsubscription object.
  subscription !: Subscription;
  // Dashboard chartDataTable
  dashboardDatas : ChartData[] = [];

  joCount : number = 0;
  countriesCount : number = 0;

  /*
  Variables ngx-chart
   */
  view : [number, number] = [640, 480];
  showLegend : boolean = false;
  showLabels : boolean = true;
  trimLabels : boolean = false;

  constructor(private olympicService : OlympicService, private router : Router) {
  }

  ngOnInit(): void {
    this.subscription = this.olympicService.getOlympics().subscribe(
      olympics => {
        this.countriesCount = olympics.length;
        this.dashboardDatas = this.dashboardDataMapper(olympics);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Méthode de mappage des données d'un tableau d'Olympic pour l'affichage dans le graphique dashBoard
   * @param olympics les données à mapper
   * @return un objet de type ChartData pour l'affichage avec ngx-charts
   */
  dashboardDataMapper(olympics : Olympic[]) : ChartData[] {
    let results: ChartData[] = [];
    for (let olympic of olympics){
      let totalMedalCount = 0;
      this.joCount = olympic.participations.length > this.joCount ? olympic.participations.length : this.joCount;
      for (let participation of olympic.participations){
        totalMedalCount += participation.medalsCount;
      }
      results.push(new ChartData(olympic.id, olympic.country, totalMedalCount));
    }
    return results;
  }

  /*
  Méthodes evenements Ngx-Charts
   */

  onSelect(data : ChartData): void {
    this.router.navigate(['/details', data.extra.id]);
  }

}
