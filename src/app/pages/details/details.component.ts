import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, Observable, of, Subscription } from 'rxjs';
import { OlympicDTO } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartService } from 'src/app/shared/chart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  public olympics$: Observable<OlympicDTO[]>;
  public subscription$: Subscription;
  public routeSub$: Subscription;
  public basicData: any;
  public nbEntries: number;
  public nbMedals: number;
  public nbAtheletes: number;

  constructor(
    private olympicService: OlympicService,
    private chartService: ChartService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscription$ = new Subscription();
    this.routeSub$ = new Subscription();
    this.olympics$ = of([]);
    this.nbEntries = 0;
    this.nbMedals = 0;
    this.nbAtheletes = 0;
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.routeSub$ = this.route.params.subscribe(params => {
      this.subscription$ = this.olympics$.pipe(
        distinctUntilChanged(),
        filter((countries) => !!countries),
        map(countries => countries.find(country => country.id == params['id'])),
        filter(country => {
          if (!country) {
            this.router.navigate(['/error']);
            return false;
          }
          return true;
        })
      )
        .subscribe(country => {
          this.nbEntries = country?.participations.length as number
          this.nbMedals = country?.participations.reduce((prev: number, current) => prev + current.medalsCount, 0) as number
          this.nbAtheletes = country?.participations.reduce((prev: number, current) => prev + current.athleteCount, 0) as number
          this.basicData = {
            labels: country?.participations.map(participation => String(participation.year)),
            datasets: [{
              label: 'Dates',
              data: country?.participations.map(participation => participation.medalsCount),
              borderColor: '#42A5F5',
            }]
          };
          console.log(this.basicData);
        })
    })
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.routeSub$.unsubscribe();
  }
}
