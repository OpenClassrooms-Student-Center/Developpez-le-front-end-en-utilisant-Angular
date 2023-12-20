import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {OlympicService} from "../../core/services/olympic.service";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, find, map, Observable, Subscription} from "rxjs";
import {DetailsChartData} from "../../core/models/DetailsChartData";
import {ChartData} from "../../core/models/ChartData";
import {Olympic} from "../../core/models/Olympic";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-olympics-details',
  templateUrl: './olympics-details.component.html',
  styleUrls: ['./olympics-details.component.scss']
})
export class OlympicsDetailsComponent implements OnInit, OnDestroy {

  subscription !: Subscription;
  datas !: DetailsChartData[];
  countryName !: string;
  entriesCount: number = 0;
  medalsCount: number = 0;
  athletesCount: number = 0;

  /*
  Variables ngx-chart
   */
  view: [number, number] = [640, 480];
  showLegend: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = false;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = "Year";
  yAxisLabel: string = "Medals";
  autoScale: boolean = true;


  constructor(private olympicService: OlympicService, private route: ActivatedRoute,private router : Router) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const olympicId = +<string>this.route.snapshot.paramMap.get('id');
    const olympic$ = this.olympicService.getOlympics();
    const olympicExtractor$ = olympic$.pipe(
      map(olympics => {
        return olympics.find(olympic => olympic.id === olympicId);
      }),
    );
    this.subscription = olympicExtractor$.subscribe(olympic => {
      this.datas = this.mapDatas(olympic);
    });
  }

  mapDatas(olympic: Olympic | undefined): DetailsChartData[] {
    let results: DetailsChartData[] = [];
    if (olympic === undefined) {
      throw new Error("Olympic is undefined");
    } else {
      let medalResults: DetailsChartData = new DetailsChartData("medals");
      this.entriesCount = olympic.participations.length;
      this.countryName = olympic.country;
      for (let participation of olympic.participations) {
        this.athletesCount += participation.athleteCount;
        this.medalsCount += participation.medalsCount;
        medalResults.series.push(new ChartData(participation.id, participation.year.toString(), participation.medalsCount));
      }
      results.push(medalResults);
    }
    return results;
  }

  onBackToDashBoard() {
    this.router.navigate(['/dashboard']);
  }


}
