import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.scss']
})
export class StatisticCardComponent implements OnInit {

  @Input()
  text! : string;
  @Input()
  value! : number;
  
  constructor() { }

  ngOnInit(): void {
  }

}
