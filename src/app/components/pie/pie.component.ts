import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, map, take } from 'rxjs';
import { Header } from 'src/app/core/models/Header';
import { Olympic } from 'src/app/core/models/Olympic';
import { PieData as DataPie } from 'src/app/core/models/PieData';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.scss',
})
export class PieComponent implements OnInit, OnDestroy {
  private destroy$!: Subject<boolean>;
  subscription: Subscription[] = [];
  dataChart$!: Observable<DataPie[]>;
  olympics!: Olympic[];
  joCount$!: Observable<number>;
  countriesCount$!: Observable<number>;
  header: Header = { title: '', indicator: [] };

  colorScheme = [
    { name: 'Italy', value: '#a95963' },
    { name: 'Spain', value: '#a8385d' },
    { name: 'Germany', value: '#7aa3e5' },
    { name: 'United States', value: '#793d52' },
    { name: 'France', value: '#aae3f5' },
  ];

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();

    this.subscription.push(
      this.olympicService
        .loadInitialData()
        .pipe(take(1))
        .subscribe(() =>
          this.subscription.push(
            this.olympicService.getOlympics().subscribe((result) => {
              if (result) {
                this.initData();
                this.header = {
                  title: 'Medals per Country',
                  indicator: [
                    {
                      description: 'Number of JOs',
                      value$: this.joCount$,
                    },
                    {
                      description: 'Number of countries',
                      value$: this.countriesCount$,
                    },
                  ],
                };
              }
            })
          )
        )
    );
  }
  /** use to destoy all observales */
  public ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
    // unsubscribe
    this.destroy$.next(true);
  }
  /**
   * init all datas for header and pie component
   */
  private initData(): void {
    try {
      this.joCount$ = this.olympicService.getTotalJo();
      this.countriesCount$ = this.olympicService
        .getOlympics()
        .pipe(map((olympics: Olympic[]) => olympics.length));
      this.dataChart$ = this.olympicService.getPieData();
    } catch (error) {
      console.log(error);
      this.router.navigate(['/not-found']);
    }
  }
  /**
   * function to go to the detail page
   * @param event dom info to select the good details page
   */
  public goToDetails(event: {
    name: string;
    value: number;
    label: string;
  }): void {
    let selectedId = 0;
    this.subscription.push(
      this.olympicService
        .getOlympicIdByName(event.name)
        .subscribe((olympic) => (selectedId = olympic?.id || 0))
    );
    this.router.navigate(['/details', selectedId]);
  }
}
