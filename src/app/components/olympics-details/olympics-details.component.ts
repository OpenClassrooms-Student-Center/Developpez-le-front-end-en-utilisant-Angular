import {Component, OnDestroy, OnInit} from '@angular/core';
import {OlympicService} from "../../core/services/olympic.service";
import {ActivatedRoute} from "@angular/router";
import {filter, map, Subscription} from "rxjs";
import {DetailsChartData} from "../../core/models/DetailsChartData";
import {ChartData} from "../../core/models/ChartData";
import {Olympic} from "../../core/models/Olympic";

@Component({
  selector: 'app-olympics-details',
  templateUrl: './olympics-details.component.html',
  styleUrls: ['./olympics-details.component.scss']
})
export class OlympicsDetailsComponent implements OnInit, OnDestroy{

  olympicId !: number;
  subscription !: Subscription;
  datas !: DetailsChartData[];
  countryName !: string;
  entriesCount : number = 0;
  medalsCount : number = 0;
  athletesCount : number = 0;

  /*
  Variables ngx-chart
   */
  view : [number, number] = [640, 480];
  showLegend : boolean = false;
  xAxis : boolean = true;
  yAxis : boolean = false;
  showXAxisLabel : boolean = true;
  showYAxisLabel : boolean = true;
  xAxisLabel : string = "Year";
  yAxisLabel : string = "Medals";
  autoScale : boolean = true;

  constructor(private olympicService : OlympicService, private route : ActivatedRoute) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.olympicId = +<string>this.route.snapshot.paramMap.get('id');
    this.subscription = this.olympicService.getOlympics().pipe(
      map(olympics => {
        this.datas = this.mapDatas(olympics);
      } )
    ).subscribe();
  }

  mapDatas(olympics : Olympic[]) : DetailsChartData[] {
    let results: DetailsChartData[] = [];
    for (let olympic of olympics) {
      if (olympic.id === this.olympicId) {
        let medalResults : DetailsChartData = new DetailsChartData("medals");
        this.entriesCount = olympic.participations.length;
        this.countryName = olympic.country;
        for (let participation of olympic.participations) {
          this.athletesCount += participation.athleteCount;
          this.medalsCount += participation.medalsCount;
          medalResults.series.push(new ChartData(participation.id, participation.year.toString(), participation.medalsCount));        }
        results.push(medalResults);
      }
    }
    return results;
  }



}
