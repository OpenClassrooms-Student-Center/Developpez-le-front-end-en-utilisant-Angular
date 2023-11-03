import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from '../core/services/olympic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  olympicData: any[] = [];
  chartData: any[] = []; 

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/mock/olympic.json').subscribe(response => {
      this.olympicData = response;
      this.chartData = this.transformToChartData(this.olympicData);

    });
  }

  transformToChartData(rawData: any[]): any[] {
    return rawData.map(country => ({
      name: country.country,
      value: country.participations.reduce((sum: number, p: { medalsCount: number }) => sum + p.medalsCount, 0)
    }));
  }

}

