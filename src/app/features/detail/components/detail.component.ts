import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { take, tap  } from 'rxjs/operators';;
import { Participation } from '../../../shared/models/participation.model'
import { ColorService } from 'src/app/shared/services/colors.service';
import { OlympicService } from 'src/app/shared/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  errorMessage! : string;
  country! : string;
  numOfEntries : number = 0
  numOfMedals: number = 0;
  numOfAthletes: number = 0;
   // options
   legend: boolean = true;
   showLabels: boolean = true;
   animations: boolean = false;
   xAxis: boolean = true;
   yAxis: boolean = true;
   showYAxisLabel: boolean = true;
   showXAxisLabel: boolean = true;
   xAxisLabel: string = 'Dates';
   yAxisLabel: string = 'Medals';
   timeline: boolean = false;
   colorScheme = {
     domain: this.colorService.getNbColorRandom(1)
   };
  tabDataOlympicParticipations : Array<{name: string, series: Array<{name: string, value : number}>}> = []
  view: number[] = [700, 300];

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
      take(2),
      tap(
        (dataCountry) => {
          dataCountry && dataCountry.forEach((participation : Participation) =>{
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
    ).subscribe({
      error : () => {
        this.errorMessage = "An error occurred please try again"
      }
    });
  }

  onResize(event : Event): void {
    const target = event.target as Window
    const width = target.innerWidth
    this.view = [width , 400 ]
  }

  onClick(){
    this.router.navigateByUrl("")
  }
}
