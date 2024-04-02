import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

/**
 * Represents a book in the catalog.
 * @private
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  /**
   * Represents a list of subscription
   * @private
   */
  private subscriptions: Subscription[] = [];

  constructor(private olympicService: OlympicService) {}
  /**
   * Loading of data retrieved from the service when the application is launched
   */
  ngOnInit(): void {
    const subscription = this.olympicService
      .loadInitialData()
      .pipe(take(1))
      .subscribe();
    this.subscriptions.push(subscription);
  }

  /**
   * Unsubscribe before component destruction
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
