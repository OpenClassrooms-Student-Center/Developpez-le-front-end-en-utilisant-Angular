import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { EntriesMedalsAthletes } from 'src/app/core/models/EntriesMedalsAthletes';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * HomeComponent is responsible for displaying and managing Olympic data.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  /**
   * Array of Country data for display.
   */
  isLoading: boolean = false;

  /**
   * Total number of Olympic Games participated.
   */
  totalOlympicGames: number = 0;

  /**
   * Total number of countries participating in the Olympics.
   */
  totalCountries: number = 0;

  /**
   * Name of the selected element.
   */
  elementSelectionne: string = '';

  /**
   * Stores entries, medals, and athletes result.
   */
  entriesMedalsAthletesResult: EntriesMedalsAthletes = {
    entries: 0,
    medals: 0,
    athletes: 0
  };

  /**
   * Subject to manage the unsubscription of observables.
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Constructs the HomeComponent.
   * @param changeDetectorRef For detecting changes manually.
   * @param olympicService Service to manage Olympic data.
   */
  constructor(private changeDetectorRef: ChangeDetectorRef, private olympicService: OlympicService) {
    this.elementSelectionne = this.olympicService.elementSelectionne;
    this.entriesMedalsAthletesResult = this.olympicService.entriesMedalsAthletesResult;
  }

  /**
   * OnInit lifecycle hook to set up subscriptions to observables.
   */
  ngOnInit(): void {

    this.olympicService.isLoading$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    // Subscribes to elementSelectionne$ observable from OlympicService
    this.olympicService.elementSelectionne$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (elementSelectionne) => {
        this.elementSelectionne = elementSelectionne;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching elementSelectionne:', error);
      }
    });

    // Subscribes to olympics$ observable from OlympicService
    this.olympicService.olympics$.subscribe(() => {
      const value = this.olympicService.processOlympicGamesAndCountry();
      this.totalOlympicGames = value.totalOlympicGames;
      this.totalCountries = value.totalCountries;
    });

  }

  /**
   * OnDestroy lifecycle hook to complete the unsubscribe$ subject.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Handles the retour (back) click event.
   */
  onRetourClick(): void {
    this.olympicService.retour();
  }
}
