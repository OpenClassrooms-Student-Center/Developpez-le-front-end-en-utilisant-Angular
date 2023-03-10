import { Component, Input } from '@angular/core';
import { StatisticCardComponent } from '../statistic-card/statistic-card.component';

@Component({
  selector: 'app-statistic-card-list',
  templateUrl: './statistic-card-list.component.html',
  styleUrls: ['./statistic-card-list.component.scss']
})
export class StatisticCardListComponent {

  @Input() titleCard!: string;
  @Input() statisticCards!: StatisticCardComponent[];

  }

