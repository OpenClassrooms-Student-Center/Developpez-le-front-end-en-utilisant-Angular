import { Olympic } from './../../core/models/Olympic';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  saleData: any[] = []; // les données dont le graph ngx-charts a besoin pour son affichage
  numberbOfJo: number = 0; // le nombre de JO du fichier Olympic.json (notre base de données actuelle)

  constructor(private olympicService: OlympicService, private route: Router) {}
  //Initialisation de graph.
  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((response) => {
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
      let jo = new Set();
      response?.map((data, i) => {
        if (data.participations[i]?.year !== undefined) {
          jo.add(data.participations[i]?.year);
        }
      });
      this.numberbOfJo = jo.size;
    });
  }

  selectOneOlympic(event: any) {
    let id = event.extra.id;
    this.route.navigateByUrl(`/country/${id}`);
  }
}
