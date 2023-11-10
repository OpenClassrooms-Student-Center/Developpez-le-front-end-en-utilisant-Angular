import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from 'src/app/core/models/Header';
import { Observable, Subscription, map } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import LineData from 'src/app/core/models/LineData';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss',
})
export class LineComponent implements OnInit {
  @Input() id!: number;
  nameCountry!: string;
  dataChart$!: Observable<LineData[]>;
  header: Header = { title: '', indicator: [] };
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
    /* this.totalParticipations$ = this.olympicService
      .getOlympicById(this.id)
      .pipe(map((olympic: Olympic) => olympic.participations.length));
    /*this.subscription.push(
      this.olympicService.getOlympicById(this.id).subscribe((result) => {
        console.log(result);
        if (result) {
          this.nameCountry = result.country;
          this.totalParticipations = result.participations.length;
        }
      })
    );*/ /*
    this.totalMedals$ = this.olympicService.getMedalsById(this.id);
    this.subscription.push(
      this.olympicService.getMedalsById(this.id).subscribe((totalMedals) => {
        if (totalMedals) this.totalMedals = totalMedals;
      })
    );
    this.subscription.push(
      this.olympicService.getAthletesById(this.id).subscribe((totalAthlete) => {
        if (totalAthlete) this.totalAthletes = totalAthlete;
      })
    );*/
    this.totalMedals$ = this.olympicService.getMedalsById(this.id);
    this.totalAthletes$ = this.olympicService.getAthletesById(this.id);
    this.totalParticipations$ !=
      this.olympicService.getParticipationsById(this.id);
    console.log(this.totalParticipations$);
    /*
    this.totalParticipations$ = this.olympicService
      .getOlympicById(this.id)
      .pipe(map((olympic: Olympic) => olympic.participations.length));*/
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
