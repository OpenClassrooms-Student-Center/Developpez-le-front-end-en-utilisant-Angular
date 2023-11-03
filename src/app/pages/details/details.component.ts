import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from "../../services/olympic-data.service";
import { OlympicData } from '../../models/olympic-data.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})


export class DetailsComponent implements OnInit {
  olympicDataForCountry?: OlympicData;

  // Informations
  nbParticipation!: number;
  nbMedals!: number;
  nbAthletes!: number;

  // Line Chart
  chartData!: {name: string, series: {name: string, value: number}[]}[];
  view: [number, number] = [700, 300];
  xAxisLabel: string = 'Dates';

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const country: string = this.route.snapshot.params['country'];

    this.dataService.getData().subscribe((data: OlympicData[]) => {
      const countryData = data.find(item => item.country === country);

      if (countryData) {
        this.olympicDataForCountry = countryData;
        this.nbParticipation = countryData.participations.length;
        this.nbMedals = countryData.participations.reduce((acc, cur) => acc + cur.medalsCount, 0);
        this.nbAthletes = countryData.participations.reduce((acc, cur) => acc + cur.athleteCount, 0);

        this.chartData = [
          {
            name: "Medals",
            series: countryData.participations.map(participation => {
              return {
                name: participation.year.toString(),
                value: participation.medalsCount
              };
            })
          }
        ];
      }
    });
  }

}
