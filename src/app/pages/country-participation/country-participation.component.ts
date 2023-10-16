import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, partition } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic/olympic.service';

@Component({
  selector: 'app-country-participation',
  templateUrl: './country-participation.component.html',
  styleUrls: ['./country-participation.component.scss']
})
export class CountryParticipationComponent implements OnInit {
  private olympicSubscribe! : Subscription;

  public olympic! : Olympic;

  // Line Chart Options
  showXAxisLabel : boolean = true;
  showYAxisLabel : boolean = false;
  xAxis : boolean = true;
  yAxis : boolean = true;
  xAxisLabel : string = 'Dates';
  timeline : boolean = true;
  autoScale : boolean = true;
  multi : Array<lineChartData> = [];

  constructor(
    private olympicService: OlympicService,
    private route : ActivatedRoute,
    private router : Router
    ) {}

  ngOnInit(): void {
    let id : number = +this.route.snapshot.params['id'];
    this.olympic = this.olympicService.getOlympic(id);
    console.log('Olympic: ' + this.olympic)
    let series : {name: string, value : number}[] = this.olympic.participations.map((partition) => ({name: String(partition.year), value: partition.medalsCount }))
    this.multi = [{
      name : this.olympic.country,
      series: series
    }]
  }

  goBack(): void {
    this.router.navigateByUrl('');
  }

};

type lineChartData = {
  name : string,
  series: Array<{name : string, value: any}>
};
