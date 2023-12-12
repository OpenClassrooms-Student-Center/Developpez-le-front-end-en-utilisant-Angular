/**
 * @fileoverview This file defines the `AppComponent` of the Angular application.
 * This component serves as the root component of the application.
 */

import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

/**
 * The `AppComponent` component.
 * This component acts as the root for the application and initializes Olympic data on startup.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  /**
   * The constructor for the `AppComponent`.
   * It injects the `OlympicService` to fetch and handle Olympic data.
   * 
   * @param {OlympicService} olympicService - The service used to load initial Olympic data.
   */
  constructor(private olympicService: OlympicService) { }

  /**
   * The `ngOnInit` lifecycle hook.
   * It is used to perform initialization logic after the component is constructed.
   * Here, it calls `loadInitialData` method of `OlympicService` to fetch Olympic data.
   */
  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe({});

  }
}
