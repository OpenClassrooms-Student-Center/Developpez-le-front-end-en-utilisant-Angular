import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from 'src/app/core/models/Header';
import { Observable, Subscription, map } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import LineData from 'src/app/core/models/LineData';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss',
})
export class LineComponent implements OnInit {
  @Input() id!: number;
  header: Header = { title: '', indicator: [] };
  nameCountry!: string;
  dataChart$!: Observable<LineData[]>;
  totalMedals$!: Observable<number | undefined>;
  totalAthletes$!: Observable<number | undefined>;
  totalParticipations$!: Observable<number | undefined>;

  subscription: Subscription[] = [];

  constructor(private olympicService: OlympicService, private route: Router) {}

  ngOnInit(): void {
    this.subscription.push(
      this.olympicService.getOlympicById(this.id).subscribe((result) => {
        if (result) {
          this.InitData();
          this.header = {
            title: this.nameCountry,
            indicator: [
              {
                description: 'Number of entries',
                value$: this.totalParticipations$,
              },
              { description: 'Total number medals', value$: this.totalMedals$ },
              {
                description: 'Total number of athletes',
                value$: this.totalAthletes$,
              },
            ],
          };
        } else {
          this.route.navigate(['/not-found']);
        }
      })
    );
  }
  private InitData(): void {
    this.totalMedals$ = this.olympicService.getMedalsById(this.id);
    this.totalAthletes$ = this.olympicService.getAthletesById(this.id);
    this.totalParticipations$ = this.olympicService
      .getParticipationsById(this.id)
      .pipe(
        map(
          (participations: Participation[] | undefined) =>
            participations?.length
        )
      );
    this.subscription.push(
      this.olympicService.getOlympicById(this.id).subscribe((result) => {
        if (result) {
          this.nameCountry = result.country;
        }
      })
    );

    this.dataChart$ = this.olympicService.getLineDataById(this.id);
  }
}
