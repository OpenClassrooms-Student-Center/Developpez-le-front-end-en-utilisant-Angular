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
  public olympics$!: Observable<Olympic[]>;
  legendTitle = 'Olympic games app';
  //public olympics$!: Observable<Olympic[]> = of(null);

  constructor(private olympicService: OlympicService, private route: Router) {}

  saleData: any[] = [];

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    console.log(this.olympics$);
    /*
"name": "France",
    "value": 36745,
    "extra": {
      "code": "fr"
    }
*/
    this.olympics$.subscribe((response) => {
      this.saleData = response.map((dt: any, i: number) => ({
        //id: dt.id,
        name: dt.country,
        value: dt.participations.reduce(
          (total: number, participation: Participation) =>
            total + participation.medalsCount,
          0
        ),
        extra: {
          id: dt.id,
        },
        /*value: dt.participations.reduce(
          (value: number) => value + dt.participations.medalsCount,
          0
        ),
        */
        //
      }));
    });
  }
  selectOneOlympic(event: any) {
    console.log(event.extra.id);
    let id = event.extra.id;
    this.route.navigateByUrl(`/country/${id}`);
  }
}
