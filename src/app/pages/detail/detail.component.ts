import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, last, map, observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { LineChartData } from 'src/app/core/models/LineChartData';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-page-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public data$! : Observable<LineChartData[]>;

  public numberOfJo$: Observable<number> | undefined;

  public numberOfMedals$: Observable<number> | undefined;

  public numberOfAthletes$: Observable<number> | undefined;

  public country$!: Observable<string>;

  view: [number, number]  = [400, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Dates';
  timeline = true;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90'],
  };

  constructor(
    private olympicService: OlympicService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const countryName = this.route.snapshot.paramMap.get("name");
    const details = this.olympicService.getOlympicByName(countryName!);

      this.data$ = details.pipe(last(), map(
        olympic => {
          if(olympic === undefined) {
            console.log("error");
            this.router.navigateByUrl(`/error`);
          }
          return [{
            name: olympic!.country,
            series: olympic!.participations.map(participation => ({
              name: `${participation.year}`,
              value: participation.medalsCount
            }))
          }];
      })
      )

    this.numberOfJo$=details.pipe(last(), map(olympic => {
      return olympic!.participations.length
    }))
    
    this.numberOfMedals$ = details.pipe(last(), map(olympic => {
        return olympic!.participations.reduce((acc, participation) => acc + participation.medalsCount, 0)

    }))

    this.numberOfAthletes$ = details.pipe(last(), map(olympic => {
      return olympic!.participations.reduce((acc, participation) => acc + participation.athleteCount, 0)

  }))

  this.country$= of(`${this.route.snapshot.paramMap.get("name")}`)!;

  }

}
