import { Component, Input } from '@angular/core';

/**
 * Component representing an information indicator containing a title and some info cards.
 */
@Component({
  selector: 'app-info-indicators',
  templateUrl: './info-indicators.component.html',
  styleUrls: ['./info-indicators.component.scss'],
})
export class InfoIndicatorsComponent {
  /**
   * The title of the information indicators.
   */
  @Input() title: string = '';

  /**
   * An array of objects containing titles and corresponding numerical values for the indicators.
   */
  @Input() indicators: { title: string; value: number }[] = [];
}
