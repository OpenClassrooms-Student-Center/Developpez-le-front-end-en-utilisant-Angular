import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { Participation } from '../../core/models/Participation';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HeaderService } from '../../core/services/header.service';
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
    private headerService: HeaderService,
    private location: Location
  ) {}

  single: any[] = [];

  entries = 0;
  totalMedals = 0;
  totalAthletes = 0;
  country! : string;

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
 * set values year and medalsCount for chart
 * Set informations entries, totalMedals and totalAthletes for Header
 */
 private setDataCharts(olympic : Olympic | undefined) {
    let dataChart : any[] = [];

    olympic?.participations!.forEach(participation => {
      this.entries++;
      this.totalMedals += participation.medalsCount;
      this.totalAthletes += participation.athleteCount;
      var obj = {
        "name": String(participation.year),
        "value": String(participation.medalsCount)
      }
      dataChart.push(obj);
    });
    this.single = [...dataChart];
 }

/**
 * Update values for header
 */
 private updateHeader() {
     this.headerService.setInfos(
       new Map<string, number>([
         ["Number of entries", this.entries],
         ["Total number medals", this.totalMedals],
         ["Total number of athletes", this.totalAthletes]
       ])
     );
     this.headerService.setTitle(this.country);
  }

 private goBack() {
  this.location.back();
 }

}
