import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-indicators',
  templateUrl: './info-indicators.component.html',
  styleUrls: ['./info-indicators.component.scss'],
})
export class InfoIndicatorsComponent {
  @Input() title: string = '';
  @Input() indicators: { title: string; value: number }[] = [];
}
