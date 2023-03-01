import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.scss']
})

export class StatisticCardComponent {

  @Input('label') label: string;
  @Input('value') value: number;

  constructor() {
    this.label = '';
    this.value = 0;
  }

}
