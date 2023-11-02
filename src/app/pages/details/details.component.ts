import {Component, ViewChild} from '@angular/core';
    import {ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ChartComponent} from "ng-apexcharts";
import {OlympicData, Participations} from "../../models/olympic-data.model";
import {DataService} from "../../services/olympic-data.service";
import {ActivatedRoute} from "@angular/router";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  olympicDataForCountry!: OlympicData | undefined;
  public nbParticipation!: number;
  public nbMedals!: number;
  public nbAthletes!: number;

  public chartData: { data: number[], label: string }[] = [
    { data: [], label: 'Medals' }
  ];
  public chartLabels: number[] = [];
  public chartOptions: any = {
    responsive: true,
  };

  constructor(private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const country: string = this.route.snapshot.params['country'];

    this.dataService.getData().subscribe((data: OlympicData[]): void => {
      this.olympicDataForCountry = data.find(item => item.country === country);

      if (this.olympicDataForCountry) {
        this.nbParticipation = this.olympicDataForCountry.participations.length;
        this.nbMedals = this.olympicDataForCountry.participations.reduce((sum: number, current: Participations) => sum + current.medalsCount, 0);
        this.nbAthletes = this.olympicDataForCountry.participations.reduce((sum: number, current: Participations) => sum + current.athleteCount, 0);

        this.chartData[0].data = this.olympicDataForCountry.participations.map(p => p.medalsCount);
        this.chartLabels = this.olympicDataForCountry.participations.map(p => p.year);
      }
    });
  }
}
