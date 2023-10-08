import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from '@core/services/index.services';
import { OlympicData } from '@core/models/olympic-data.types';
import { Router } from '@angular/router';

type medalCountyItem = {
  id: number;
  country: string;
  earnedMedals: number;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<OlympicData> = this.olympicService.getOlympics();
  public isLoading$ = this.olympicService.getIsLoading();

  medalsArray!: medalCountyItem[];
  constructor(
    private olympicService: OlympicService,
    private routerService: Router
  ) {}

  ngOnInit(): void {}

  selectCountryById(e: Event): void {
    console.log(e);
    this.routerService.navigateByUrl(`/details`);
  }

  ngOnDestroy(): void {}
}
