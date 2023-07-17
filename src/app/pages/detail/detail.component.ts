import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Observable, of, pipe, map } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  numberOfEntries: Observable<any> = of(null);
  totalNumberMedals!: number;
  totalNumberOfAthletes!: number;
  ngxChartsData: any[] = [];
  // ngx-charts options
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  timeline: boolean = false;
  colorScheme = { domain: ['#5AA454']};

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.olympicService.getOlympics().pipe(
      map((value: any) => {
        if (typeof value === 'object') {
          this.getgetOlympicById(value);
          this.totalNumberMedals = this.getTotalBumberMedals(value);
          this.totalNumberOfAthletes = this.getTotalNumberAthletes(value);
        }
      })
    ).subscribe();
    this.numberOfEntries = this.olympicService.getOlympics();
  }

  getgetOlympicById(data: any): void {
    data.map((val: any) => 
    val.id == this.route.snapshot.paramMap.get('id')
      ? this.ngxChartsData = this.createDataToNgxCharts(val) :
      Error('Olympic not found!')
    )
  }

  createDataToNgxCharts(olympic: any) {
    let listYearMedals: any = [] 
    olympic.participations.map((val: any) => { 
      return listYearMedals.push({
        name: String(val.year),
        value: val.medalsCount
      })
    });
    this.ngxChartsData.push({
      "name": olympic.country,
      "series": listYearMedals
    })
    
    return [...this.ngxChartsData]
  }


  getTotalBumberMedals(data: any): number {
    //TODO code here
    return 96; 
  }
  getTotalNumberAthletes(data: any): number {
    // TODO code here
    return 1204;
  }

  onViewFaceSnap() {
    this.router.navigateByUrl(`dashboard`);
  }
}
