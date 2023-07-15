import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  ngxChartsData: any[] = [];


  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe((value) => {
      for (let index in value) {
        value[index].id == this.route.snapshot.paramMap.get('id')
          ? this.ngxChartsData = this.createDataToNgxCharts(value[index]) :
          Error('Olympic not found!')
      }
    });
  }

  createDataToNgxCharts(olympic: any) {
    let listYearMedals = [];
    for (let participation of olympic.participations) {
      listYearMedals.push({
        name: String(participation.year),
        value: participation.medalsCount
      })
    }
    this.ngxChartsData.push({
      "name": olympic.country,
      "series": listYearMedals
    })

    console.log(this.ngxChartsData)
    return [...this.ngxChartsData]
  }

  onViewFaceSnap() {
    this.router.navigateByUrl(`dashboard`);
  }

  view: [number, number] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  /*
  constructor() {
    Object.assign(this, { multi });
  }*/

  /*
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }*/

}
