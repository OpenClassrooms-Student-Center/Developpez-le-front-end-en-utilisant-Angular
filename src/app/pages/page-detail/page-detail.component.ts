import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, last, map, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { LineChartData } from 'src/app/core/models/LineChartData';
import { Color, DataItem, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss']
})
export class PageDetailComponent implements OnInit {

  public data$! : Observable<LineChartData[]>;

  view: [number, number]  = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'Number of medals';
  timeline = true;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90'],
  };

  // line, area
  autoScale = true;

  constructor(
    private olympicService: OlympicService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const countryName = this.route.snapshot.paramMap.get("name");
    const details = this.olympicService.getOlympicByName(countryName!);

        
    this.data$ = details.pipe(last(), map(olympic => [{
      name: olympic!.country,
      series: olympic!.participations.map(participation => ({
          name: `${participation.year}`,
          value: participation.medalsCount
      }))
    }]))
  }

}
