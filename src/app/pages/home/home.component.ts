import { Component, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Subject, tap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * HomeComponent is responsible for displaying and managing Olympic data.
 * It also handles the loading states and potential errors.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  /**
   * Indicates whether data is being loaded.
   */
  isLoading: boolean = false;

  /**
   * Total number of Olympic Games participated in.
   */
  totalOlympicGames: number = 0;

  /**
   * Total number of countries participating in the Olympics.
   */
  totalCountries: number = 0;

  /**
   * Indicates whether an error has occurred.
   */
  error: boolean = false;

  /**
   * Subject used to manage unsubscription from observables upon component destruction.
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Constructs the HomeComponent.
   * @param olympicService Service to manage Olympic data.
   */
  constructor(private olympicService: OlympicService) {
  }

  /**
   * OnInit lifecycle hook to set up subscriptions to observables.
   * It subscribes to loading, error, and Olympic data observables.
   */
  ngOnInit(): void {
    
    this.subscribeToOlympics();

    this.olympicService.isLoading$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.olympicService.error$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(error => {
      this.error = error;
    });

  }

  /**
   * OnDestroy lifecycle hook to complete the unsubscribe$ subject,
   * ensuring cleanup of subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Subscribes to the olympics$ observable from OlympicService.
   * Processes the Olympic data upon each emission.
   */
  private subscribeToOlympics() {
    this.olympicService.olympics$
      .pipe(
        tap(() => this.processOlympicData()),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  /**
   * Processes Olympic data, updating total Olympic Games and total countries.
   */
  private processOlympicData() {
    const value = this.olympicService.processOlympicGamesAndCountry();
    this.totalOlympicGames = value.totalOlympicGames;
    this.totalCountries = value.totalCountries;
  }

}
