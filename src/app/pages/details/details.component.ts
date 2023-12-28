import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { EntriesMedalsAthletes } from 'src/app/core/models/EntriesMedalsAthletes';
import { Subject, filter } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  countryName!: string;

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

    // Subscribe to the paramMap observable of the route to retrieve route parameters.
    this.route.paramMap.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(params => {
      const countryName = params.get('countryname');
      if (countryName) {
        this.countryName = countryName;
      } else {
        this.router.navigate(['']);
      }
    });

    // Subscribe to olympics$ observable to handle country selection and validation
    this.olympicService.olympics$.pipe(
      filter(countries => countries && countries.length > 0),
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      if (this.countryName) {
        this.olympicService.updateCountryId(this.countryName);
        this.olympicService.isValidCountry().subscribe(isValid => {
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

    // Subscribes to entriesMedalsAthletesResult$ observable from OlympicService
    this.olympicService.entriesMedalsAthletesResult$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (entriesMedalsAthletesResult) => {
        this.entriesMedalsAthletesResult = entriesMedalsAthletesResult;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.entriesMedalsAthletesResult = { entries: 0, medals: 0, athletes: 0 };
      }
    });
  }

  /**
   * Handles the retour (back) click event.
  */
  onRetourClick(): void {
    this.olympicService.retour();
  }

  /**
   * OnDestroy lifecycle hook to clean up resources.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
