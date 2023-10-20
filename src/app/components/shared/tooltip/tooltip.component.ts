import { Component, Input, OnInit } from '@angular/core';
import { formatLocalizedPrecisionNumber } from '@utils/helpers/internalization.helpers';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
  @Input() country: string = '';
  @Input() earnedMedals: number = 0;

  public formattedEarnedMedals: string = '';

  constructor() {}

  ngOnInit(): void {
    this.formattedEarnedMedals = formatLocalizedPrecisionNumber(
      this.earnedMedals
    );
  }
}
