import { Component, Input, OnInit } from '@angular/core';
import { formatLocalizedPrecisionNumber } from '@utils/helpers/internalization.helpers';

/**
 * Component representing an information card.
 */
@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent implements OnInit {
  /**
   * The title of the information card.
   */
  @Input() title: string = '';

  /**
   * The numerical value to be displayed on the card.
   */
  @Input() numberValue: number = 0;

  /**
   * The formatted numerical value to be displayed on the card.
   */
  public formattedValue: string = '';

  ngOnInit(): void {
    this.formattedValue = formatLocalizedPrecisionNumber(this.numberValue);
  }
}
