import { Component, OnInit } from '@angular/core';
import { Observable, map, of, take, tap } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { LegendPosition} from '@swimlane/ngx-charts';
import {Color} from 'src/app/core/models/Color'
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { ColorService } from 'src/app/core/services/colors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  view: any = [700, 400];
  tabChartOlympics! : object[]
  gradient!: boolean;
  showLegend!: boolean;
  showLabels!: boolean;
  isDoughnut!: boolean;
  legendPosition!: LegendPosition;
  colorScheme! : Color;

  constructor(private olympicService: OlympicService,
     private colorService : ColorService,
     private router: Router) {}

  ngOnInit(): void {
    this.view = [window.innerWidth, 400]
    this.olympics$ = this.olympicService.getOlympics();
    
    this.olympics$.pipe(
      take(2),
      tap(tabOlympics => {
        if (tabOlympics){
          let tabObjectOlympics : Object[] = []
          tabOlympics.forEach((olympicCountry : OlympicCountry) => {
            let nb = 0;
            olympicCountry.participations.forEach(participation =>{
              nb += participation.medalsCount
            })
            const olympicsChart : { name : string, value : number} = {
              name : olympicCountry.country,
              value : nb,
            }
            tabObjectOlympics.push(olympicsChart)
            
          })
          this.tabChartOlympics = tabObjectOlympics;
        }
        // Pie Configuration
        this.gradient = true;
        this.showLegend = false;
        this.showLabels = true;
        this.isDoughnut = false;
        this.legendPosition = LegendPosition.Right;
        this.colorScheme = {
          domain: this.colorService.getNbColorRandom(this.tabChartOlympics?.length)
        };
      })
      ).subscribe()
      
        
  }

  
  onSelect(data : any): void {
    this.router.navigateByUrl(`/detail/${data.name}`)
  }

  onResize(event : any): void {
    this.view = [event.target.innerWidth , 400 ]
  }
  public myLabelFormatter(label: string ) {
    return label.toUpperCase();
 }
}
