import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Country } from 'src/app/core/models/Olympic';
import { EntriesMedalsAthletes } from 'src/app/core/models/EntriesMedalsAthletes';
import { Subject, Subscription, of, filter } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';

/**
 * Component for displaying details of a selected country.
 */
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  /**
   * Flag to indicate if data is loading.
   */
  isLoading: boolean = false;

  /**
   * Name of the selected element.
   */
  elementSelectionne: string = '';

  /**
   * Flag to indicate if the selected country is valid.
   */
  isValidCountry: boolean = true;

  /**
   * Stores entries, medals, and athletes result.
   */
  entriesMedalsAthletesResult: EntriesMedalsAthletes = {
    entries: 0,
    medals: 0,
    athletes: 0
  };

  /**
   * The name of the selected country (from route parameter).
   */
  countryName: string | null | undefined;

  /**
   * Subscription to manage resource cleanup.
   */
  private subscription: Subscription = new Subscription();

  /**
   * Subject to manage the unsubscription of observables.
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Constructor to inject dependencies.
   * @param route - The ActivatedRoute for retrieving route parameters.
   * @param router - The Router for navigation.
   * @param changeDetectorRef - The ChangeDetectorRef for manual change detection.
   * @param olympicService - The OlympicService for data retrieval.
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private olympicService: OlympicService
  ) {
    this.elementSelectionne = this.olympicService.elementSelectionne;
    this.entriesMedalsAthletesResult = this.olympicService.entriesMedalsAthletesResult;
  }

  /**
   * OnInit lifecycle hook to initialize the component.
   */
  ngOnInit(): void {

    // Subscribe to isLoading$ observable to track data loading status
    this.olympicService.isLoading$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    // Subscribe to paramMap observable to retrieve route parameters
    this.route.paramMap.pipe(
      catchError((error) => {
        console.error('Error fetching route parameters:', error);
        return of(null);
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(params => {
      if (params) {
        this.countryName = params.get('countryname');
        console.log(this.countryName);
      } else {
        console.log('No route parameters available');
      }
    });

    // Subscribe to olympics$ observable to handle country selection and validation
    this.olympicService.olympics$.pipe(
      filter(countries => countries && countries.length > 0),
      takeUntil(this.unsubscribe$)
    ).subscribe(countries => {
      if (this.countryName) {
        this.olympicService.isValidCountry(this.countryName).subscribe(isValid => {
          this.isValidCountry = isValid;

          if (typeof this.countryName === 'string') {
            this.olympicService.updateElementSelectionne(this.countryName);
          }

          if (!isValid) {
            this.router.navigate(['/not-found']);
          }
        });
      }
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

    // Subscribes to entriesMedalsAthletesResult$ observable from OlympicService
    this.olympicService.entriesMedalsAthletesResult$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (entriesMedalsAthletesResult) => {
        this.entriesMedalsAthletesResult = entriesMedalsAthletesResult;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching entriesMedalsAthletesResult:', error);
        // Handle error or set default values
        this.entriesMedalsAthletesResult = { entries: 0, medals: 0, athletes: 0 };
      }
    });
  }

  /**
   * OnDestroy lifecycle hook to clean up resources.
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
