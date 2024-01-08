import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { Participation } from '../../core/models/Participation';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService,
    private location: Location
  ) {}

  dataChart: {name: string, value: number}[] = [];
  view: [number, number] = [0,0];

  entries = 0;
  totalMedals = 0;
  totalAthletes = 0;
  country! : string;
  infosHeaders: Map<string, number> = new Map<string, number>();

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.olympicService.getOlympic(id)
      .subscribe(olympic => {
          this.setDataCharts(olympic);
          this.country = olympic?.country!;
          this.updateHeader();
      });
  }

 /**
  * Resize window when window changes
  */
  onResize(event : Event) {
   const target = event.target as Window;
      this.view = [target.innerWidth / 1.1, target.innerHeight/ 2];
  }

 /**
 * set values year and medalsCount for chart
 * Set informations entries, totalMedals and totalAthletes for Header
 */
 private setDataCharts(olympic : Olympic | undefined) {
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
 private updateHeader() {
    this.infosHeaders = new Map<string, number>([
         ["Number of entries", this.entries],
         ["Total number medals", this.totalMedals],
         ["Total number of athletes", this.totalAthletes]
       ]);
  }

 private goBack() {
  this.location.back();
 }

}
