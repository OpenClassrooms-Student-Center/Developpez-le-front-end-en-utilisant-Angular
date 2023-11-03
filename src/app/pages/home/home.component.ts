import { Component, Input, OnInit } from '@angular/core';

import { Observable, last, map, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Color, DataItem, LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public data$: Observable<DataItem[]> | undefined;
 
  public numberOfJo$: Observable<number> | undefined;

  public participationsByOlympic$ : Observable<DataItem> | undefined;

   view: [number, number] = [400, 600];

   // options ngx-charts
   gradient: boolean = true;
   showLabels: boolean = true;
   isDoughnut: boolean = false;
   colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90'],
  };


  constructor(private olympicService: OlympicService, private router: Router) {
  }

  ngOnInit(): void {

    //contient un observable
    const olympicsData = this.olympicService.getOlympics();

    // When data finished loading, map data to valid chart data
    this.data$ = olympicsData.pipe(last(), map(olympics => {

      return olympics.map(olympic => ({

        name: olympic.country,

        value: olympic.participations.reduce((acc, participation) => acc + participation.medalsCount, 0)

      }) as DataItem);

    }));

    this.numberOfJo$=olympicsData.pipe(last(), map(olympics => {
      return olympics.reduce((acc,current) => current.participations.length> acc ? current.participations.length: acc,0)
    }))

  }

  public onSelect(selectedItem: DataItem) {
    this.router.navigateByUrl(`country/${selectedItem.name}`);
  }
}
