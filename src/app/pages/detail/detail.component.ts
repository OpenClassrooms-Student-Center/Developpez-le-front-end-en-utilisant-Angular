import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { take, tap  } from 'rxjs/operators';;
import { Participation } from 'src/app/core/models/Participation';
import { ColorService } from 'src/app/core/services/colors.service';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  
  country! : string;
  numOfEntries : number = 0
  numOfMedals: number = 0;
  numOfAthletes: number = 0;
   // options
   legend: boolean = true;
   showLabels: boolean = true;
   animations: boolean = true;
   xAxis: boolean = true;
   yAxis: boolean = true;
   showYAxisLabel: boolean = true;
   showXAxisLabel: boolean = true;
   xAxisLabel: string = 'Dates';
   yAxisLabel: string = 'Medals';
   timeline: boolean = true;
 
   colorScheme = {
     domain: this.colorService.getNbColorRandom(1)
   };
  tabDataOlympicParticipations : Array<{name: string, series: Array<{name: string, value : number}>}> = []
  
  view: any[] = [700, 300];

  constructor(private router: Router,
      private route: ActivatedRoute,
      private olympicService : OlympicService,
      private colorService: ColorService){}

  
  ngOnInit(): void {
    this.view = [window.innerWidth, 400]
    this.country = this.route.snapshot.paramMap.get("name")!;
    this.tabDataOlympicParticipations.push({
      name : this.country,
      series : []
    })
    this.getdataOlympics()
  }

  getdataOlympics() {
    this.olympicService.getDataOlympicsCountry(this.country).pipe(
      take(1),
      tap(
        (dataCountry) => {
          dataCountry.forEach((participation : Participation) =>{
                this.numOfEntries++
                this.numOfMedals+= participation.medalsCount
                this.numOfAthletes += participation.athleteCount
                this.tabDataOlympicParticipations[0].series.push({
                  name : participation.year.toString(),
                  value : participation.medalsCount
                })
              })
              this.tabDataOlympicParticipations = [...this.tabDataOlympicParticipations]       
        }
      )
    ).subscribe();
  }

  onResize(event : any): void {
    this.view = [event.target.innerWidth , 400 ]
  }

  onClick(){
    this.router.navigateByUrl("")
  }
}
