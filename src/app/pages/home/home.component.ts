import { Olympic } from './../../core/models/Olympic';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, take, tap } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Participation } from '../../core/models/Participation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$! : Observable<Olympic[]>;
  legendTitle = 'Olympic games app';
  numberOfJos = 0;
 
  constructor(private olympicService: OlympicService, private route: Router) {}

  saleData: any[] = [];
  nbOfJo:Participation[]=[]

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((response) => {
      const year = response?.map(
        data =>({jo:data.participations})
      );

      this.saleData = response?.map((dt) => ({
        name: dt.country,
        value: dt.participations.reduce(
          (total: number, participation: Participation) =>
            total + participation.medalsCount,
          0
        ),
        extra: {
          id: dt.id,
        },
      }));
      //console.log(this.saleData)
      //this.numberOfJos =  this.saleData?.reduce((total:number,data:any) => total+data.value,0);
    }  
    );
  }
  
  selectOneOlympic(event: any) {
    let id = event.extra.id;
    this.route.navigateByUrl(`/country/${id}`);
  }
}
