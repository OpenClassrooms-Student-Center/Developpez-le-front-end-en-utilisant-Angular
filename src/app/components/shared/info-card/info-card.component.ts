import { Component, Input, OnInit } from '@angular/core';
import { formatLocalizedPrecisionNumber } from '@utils/helpers/internalization.helpers';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() numberValue: number = 0;

  public formattedValue: string = '';

  ngOnInit(): void {
    this.formattedValue = formatLocalizedPrecisionNumber(this.numberValue);
  }
}
