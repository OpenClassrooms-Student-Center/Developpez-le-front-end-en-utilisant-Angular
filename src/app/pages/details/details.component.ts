import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Country } from 'src/app/core/models/Olympic';
import { EntriesMedalsAthletes } from 'src/app/core/models/EntriesMedalsAthletes';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  /**
   * Array of Country data for display.
   */
  data: Country[] = [];

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

  constructor(private changeDetectorRef: ChangeDetectorRef, private olympicService: OlympicService) {
    this.elementSelectionne = this.olympicService.elementSelectionne;
    this.entriesMedalsAthletesResult = this.olympicService.entriesMedalsAthletesResult;
  }

  ngOnInit(): void {
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
