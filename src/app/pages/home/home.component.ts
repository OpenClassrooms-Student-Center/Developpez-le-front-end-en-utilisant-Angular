import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from '@core/services/index.services';
import { OlympicData } from '@core/models/olympic-data.interface';
import { PieChartComponent } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<OlympicData> = of([]);

  constructor(
    private olympicService: OlympicService,
    private routerService: Router
  ) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }

  selectCountryById(e: Event): void {
    console.log(e);
    // this.routerService.navigateByUrl(`/details`);
  }

  ngOnDestroy(): void {}
}
