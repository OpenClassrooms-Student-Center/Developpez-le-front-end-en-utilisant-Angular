import { Component, Input, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { pie, arc, Pie, Arc, DefaultArcObject, PieArcDatum } from 'd3-shape';
import { Olympic } from 'src/app/core/models/Olympic';
import { BrowserModule } from '@angular/platform-browser';
import { Color, LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
   public olympics$: Observable<any> = of(null);

   olympicData!: Olympic[];
 
   view: [number, number] = [400, 400];

   // options
   gradient: boolean = true;
   showLegend: boolean = true;
   showLabels: boolean = true;
   isDoughnut: boolean = false;
   legendPosition: LegendPosition = LegendPosition.Below;
   colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90'],
  };


  constructor(private olympicService: OlympicService) {
    Object.assign(this, this.olympicData );
    //Object.assign(this, { olympicData });
  }


  ngOnInit(): void {
   this.olympics$ = this.olympicService.getOlympics();
   //this.getOlympicData;
    
  }
  //getOlympicData() {
    //this.olympicService.showOlympic().subscribe((data: any) => {
      //this.olympicData = data;
   // });
 // }
}
