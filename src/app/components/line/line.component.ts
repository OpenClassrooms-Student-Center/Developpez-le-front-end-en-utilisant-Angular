import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Header } from 'src/app/core/models/Header';
import { Observable, Subject, Subscription, map, take } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import LineData from 'src/app/core/models/LineData';
import { Participation } from 'src/app/core/models/Participation';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss',
})
export class LineComponent implements OnInit, OnDestroy {
  private destroy$!: Subject<boolean>;
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
    this.destroy$ = new Subject<boolean>();
    this.subscription.push(
      this.olympicService
        .loadInitialData()
        .pipe(take(1))
        .subscribe(() =>
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
                    {
                      description: 'Total number medals',
                      value$: this.totalMedals$,
                    },
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
          )
        )
    );
  }
  /** use to destoy all observales */
  public ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
    this.destroy$.next(true);
  }
  /**
   * init all datas for header and line component
   */
  private InitData(): void {
    try {
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
    } catch (error) {
      console.error(error);
      this.route.navigate(['/not-found']);
    }
  }
}
