import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription !: Subscription;
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.subscription = this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
