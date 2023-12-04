import { Component, Input } from '@angular/core';

interface LineChartData {
  name: string; series: {value:number; name: number}[]
}

@Component({
  selector: 'app-linechart',
  template: `
    <ngx-charts-line-chart
      [results]="data"
      [view]="[500, 300]"
      [gradient]="false"
      [xAxis]="true"
      [yAxis]="true"
    >
    </ngx-charts-line-chart>
  `,
})
export class LinechartComponent {
  @Input() data: LineChartData[] = [];
}