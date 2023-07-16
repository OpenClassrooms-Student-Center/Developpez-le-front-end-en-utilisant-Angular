import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'app/core/models/Olympic';
import { OlympicService } from 'app/core/services/olympic.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  public chart: any;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.createChart();
  }
  createChart() {
    this.chart = new Chart("TestChart", {
      type : 'pie',
      data: {
        labels : ['Red', 'Pink', 'Green', 'Yellow', 'Orange', 'Blue',],
        datasets : [{
          label: 'Test Dataset',
          data : [300, 240, 100, 432, 253, 34],
          backgroundColor : [
            'red', 
            'pink', 
            'green', 
            'yellow', 
            'orange', 
            'blue',
          ],
          hoverOffset : 4
        }],
      }, options : {aspectRatio: 2.5}
    })
  }
}
