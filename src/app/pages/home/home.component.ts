import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { OlympicService } from '@core/services/index.services';
import {
  Country,
  OlympicData,
  medalCountyItem,
} from '@core/models/olympic-data.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<OlympicData> = this.olympicService.getOlympics();
  public isLoading$ = this.olympicService.getIsLoading();

  public medalsArray: medalCountyItem[] = [];

  constructor(
    private olympicService: OlympicService,
    private routerService: Router
  ) {}

  ngOnInit(): void {
    this.olympics$ = this.olympics$.pipe(
      tap((olympicCountryData) => {
        const hasNoCountriesToDisplay: boolean = olympicCountryData.length < 1;
        if (hasNoCountriesToDisplay) {
          return;
        }

        this.setMedalsArray(olympicCountryData);
      })
    );
  }

  ngOnDestroy(): void {}

  setMedalsArray(olympicData: OlympicData) {
    for (let i = 0; i < olympicData.length; i++) {
      const { id, country, participations } = olympicData[i];

      const earnedMedals: number = participations.reduce((acc, cur) => {
        return acc + cur.medalsCount;
      }, 0);

      this.medalsArray.push({
        id,
        name: country,
        value: earnedMedals,
      });
    }

    console.log(this.medalsArray);
  }

  selectCountryById(e: Event): void {
    console.log(e);
    this.routerService.navigateByUrl(`/details`);
  }
}
