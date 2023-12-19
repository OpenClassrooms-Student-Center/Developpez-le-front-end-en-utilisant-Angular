import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.scss']
})
export class StatisticCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() value: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
