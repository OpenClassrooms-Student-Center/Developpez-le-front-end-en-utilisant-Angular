import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-piechart',
  template: `
    <ngx-charts-pie-chart
      [results]="data"
      [view]="[400, 300]"
      [gradient]="false"
      (select)="onSelect($event)"
    >
    </ngx-charts-pie-chart>
  `,
})
export class PiechartComponent {
  @Input() data: any[] = [];

  onSelect(event: any): void {
  }
}
