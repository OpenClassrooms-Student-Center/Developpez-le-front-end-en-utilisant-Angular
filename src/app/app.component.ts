import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy
{
  olympicsSubscription! : Subscription;

  constructor(private olympicService: OlympicService,
              private router: Router) {}

  ngOnInit(): void {
    this.olympicsSubscription = this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }

  ngOnDestroy(): void {
    this.olympicsSubscription.unsubscribe();
  }

  setCursor() : String {
    return this.router.url === '/' ? 'auto' : 'pointer'
  }

  // Navigate back to the main page if not already on it
  onPageTitleClicked() : void {
    if (this.router.url === '')
      return;
    this.router.navigateByUrl('');
  }
}
