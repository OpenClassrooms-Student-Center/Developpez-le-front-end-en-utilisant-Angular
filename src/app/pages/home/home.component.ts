import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  joCount: number = 0;
  countryCount!: number;

  countryList!: string[];

  medalsPerCountry!: number[];

  olympicSubscription!: Subscription;

  public olympics$: Observable<Olympic[]> = of([]);

  joCount: number = 0;
  countryCount!: number;

  countryList!: string[];

  medalsPerCountry!: number[];

  olympicSubscription!: Subscription;

  public olympics$: Observable<Olympic[]> = of([]);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }


}
