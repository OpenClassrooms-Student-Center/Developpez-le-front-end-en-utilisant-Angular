import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-swimlane',
  templateUrl: './swimlane.component.html',
  styleUrls: ['./swimlane.component.scss']
})
export class SwimlaneComponent {
  countryName!: string;
  participationsCount!: number;
  totalMedals!: number;
  totalAthletes!: number;

  constructor(private route: ActivatedRoute, private olympicService: OlympicService,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.countryName = params.get('countryName')!;
    });
    this.olympicService.getFormattedOlympics().subscribe(data => {
      const countryData = data.find(country => country.name === this.countryName);
      if (countryData) {
        this.participationsCount = countryData.participations.length;
        this.totalMedals = countryData.participations.reduce((sum: any, participation: { medalsCount: any; }) => sum + participation.medalsCount, 0);
        this.totalAthletes = countryData.participations.reduce((sum: any, participation: { athleteCount: any; }) => sum + participation.athleteCount, 0);
      }
    });

  }

}
