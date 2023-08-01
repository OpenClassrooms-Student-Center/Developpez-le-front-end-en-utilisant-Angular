import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public olympicSubscription!: Subscription;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
   this.olympicSubscription = this.olympicService.loadInitialData().subscribe();
  }

  ngOnDestroy(): void {
    this.olympicSubscription.unsubscribe();
  }
}
