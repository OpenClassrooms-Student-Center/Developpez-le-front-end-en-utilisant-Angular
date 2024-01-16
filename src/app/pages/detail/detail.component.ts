import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from './../../core/models/Olympic';
import { Participation } from './../../core/models/Participation';
import { Component, OnInit } from '@angular/core';
import { filter, Observable, map } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>;
  public participations$!: Observable<Olympic[]>;
  id!: number;
  numberOfCountry:number=0;
  numberOfMedhal:number=0;
  numberOfAthlete:number=0;
  nameOfCountry!:string;

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  saleData: any[] = [];
  yAxisLabel!: string;
  showYAxisLabel = true;
  view = [1500, 500];
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.participations$ = this.olympicService.getParticipations(this.id);
    

    this.participations$.subscribe((data) => {
      //console.log(this.id)
     // console.log(data[0])
      const pays = data?.find((elt,i) => elt.id == this.id);
      const participations = pays?.participations as Participation[];
      this.numberOfAthlete = participations.reduce((total,value)=>total+value.athleteCount,0)
      console.log(participations);
      const series = participations?.map(
        elt => ({value:elt.medalsCount,name : elt.year.toFixed() })
        );
      this.numberOfCountry = series.length;
      this.numberOfMedhal = series.reduce((total,value)=>total+value.value,0);
      //console.log(series)
      this.saleData = [{name: pays?.country, series: series}];
      
      //console.log(this.saleData);
      /*
      this.saleData = [
        {
          "name": "Morocco",
          "series": [
            {
              "value": 5924,
              "name": "2016-09-22T23:26:59.215Z"
            },
            {
              "value": 6725,
              "name": "2016-09-17T17:32:23.248Z"
            },
            {
              "value": 6257,
              "name": "2016-09-18T07:17:35.117Z"
            },
            {
              "value": 3112,
              "name": "2016-09-13T00:41:41.334Z"
            },
            {
              "value": 3496,
              "name": "2016-09-22T23:21:20.391Z"
            }
          ]
        },
        {
          "name": "Czech Republic",
          "series": [
            {
              "value": 6495,
              "name": "2016-09-22T23:26:59.215Z"
            },
            {
              "value": 2152,
              "name": "2016-09-17T17:32:23.248Z"
            },
            {
              "value": 4653,
              "name": "2016-09-18T07:17:35.117Z"
            },
            {
              "value": 4668,
              "name": "2016-09-13T00:41:41.334Z"
            },
            {
              "value": 3582,
              "name": "2016-09-22T23:21:20.391Z"
            }
          ]
        },
        {
          "name": "Isle of Man",
          "series": [
            {
              "value": 5361,
              "name": "2016-09-22T23:26:59.215Z"
            },
            {
              "value": 6216,
              "name": "2016-09-17T17:32:23.248Z"
            },
            {
              "value": 6917,
              "name": "2016-09-18T07:17:35.117Z"
            },
            {
              "value": 3184,
              "name": "2016-09-13T00:41:41.334Z"
            },
            {
              "value": 4452,
              "name": "2016-09-22T23:21:20.391Z"
            }
          ]
        },
        {
          "name": "Slovenia",
          "series": [
            {
              "value": 2099,
              "name": "2016-09-22T23:26:59.215Z"
            },
            {
              "value": 5843,
              "name": "2016-09-17T17:32:23.248Z"
            },
            {
              "value": 5161,
              "name": "2016-09-18T07:17:35.117Z"
            },
            {
              "value": 6007,
              "name": "2016-09-13T00:41:41.334Z"
            },
            {
              "value": 4964,
              "name": "2016-09-22T23:21:20.391Z"
            }
          ]
        },
        {
          "name": "Papua New Guinea",
          "series": [
            {
              "value": 4509,
              "name": "2016-09-22T23:26:59.215Z"
            },
            {
              "value": 3866,
              "name": "2016-09-17T17:32:23.248Z"
            },
            {
              "value": 6169,
              "name": "2016-09-18T07:17:35.117Z"
            },
            {
              "value": 6569,
              "name": "2016-09-13T00:41:41.334Z"
            },
            {
              "value": 5921,
              "name": "2016-09-22T23:21:20.391Z"
            }
          ]
        }
      ];
      */

      //console.log(this.saleData)
      }
    );
  }

  private resizeChart(width: any): void {
    this.view = [width, 320];
  }
}
