import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  constructor(private olympicService: OlympicService) {}

  // Chargement des données récupérées via olympicService
  ngOnInit(): void {
    const subscription = this.olympicService.loadInitialData().pipe(take(1)).subscribe();
    this.subscriptions.push(subscription);
  }

// Désinscription avant la destruction du component
  ngOnDestroy(): void {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
  
}
