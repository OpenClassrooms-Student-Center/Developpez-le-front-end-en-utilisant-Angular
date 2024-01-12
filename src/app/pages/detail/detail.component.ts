import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { Participation } from '../../core/models/Participation';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  public dataChart: {name: string, value: number}[] = [];
  public view: [number, number] = [0,0];
  private entries: number= 0;
  private totalMedals: number = 0;
  private totalAthletes: number = 0;
  protected country!: string;
  protected infosHeaders: Map<string, number> = new Map<string, number>();

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService,
    private location: Location,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.spinner.show().then(x => {
      this.olympicService.getOlympic(id)
        .subscribe(olympic => {
          if (olympic === undefined) {
            this.router.navigateByUrl('404', {skipLocationChange: true});
          } else {
            this.setDataCharts(olympic);
            this.country = olympic?.country!;
            this.updateHeader();
          }
      });
    });
  }

 /**
  * Resize chart when window changes
  */
  onResize(event : Event): void {
   const target = event.target as Window;
      this.view = [target.innerWidth / 1.1, target.innerHeight/ 2];
  }

  /**
  * set values year and medalsCount for chart
  * Set informations entries, totalMedals and totalAthletes for Header
  */
  private setDataCharts(olympic : Olympic | undefined): void {
    if (olympic && olympic.participations.length !== 0) {
      this.dataChart = olympic.participations.map((participation : Participation) => {
        this.entries++;
        this.totalMedals += participation.medalsCount;
        this.totalAthletes += participation.athleteCount;
        return {
          "name": String(participation.year),
          "value": participation.medalsCount
        };
      });
    }
  }

  /**
   * Update values for header
   */
   private updateHeader(): void {
      this.infosHeaders = new Map<string, number>([
           ["Number of entries", this.entries],
           ["Total number medals", this.totalMedals],
           ["Total number of athletes", this.totalAthletes]
         ]);
    }

   private goBack(): void {
    this.location.back();
   }

}
