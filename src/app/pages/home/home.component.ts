import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { PieChartData } from 'src/app/core/models/PieChartData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  medalImage: string = './assets/images/medal.svg';
  olympics$: Observable<Olympic[] | undefined | null> = of(null);
  data: PieChartData[] = [];
  view: [number, number] = [500, 500];
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((value) => {
      if (value) {
        this.data = value.map((element) => {
          return {
            name: element.country,
            value: this.getCountryTotalMedals(element.participations),
          };
        });
      }
    });
  }

  getCountryTotalMedals(participations: Participation[]): number {
    let totalMedals: number = 0;
    participations.forEach((participation) => {
      totalMedals += participation.medalsCount;
    });
    return totalMedals;
  }
}
