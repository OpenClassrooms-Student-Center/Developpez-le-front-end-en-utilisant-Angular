/**
 * TitleComponent displays a title for a chart.
 * @class
 */
import { Component, OnInit, Input } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  /**
   * The title to display.
   * @type {string}
   * @default ''
   * @memberof TitleComponent
   */
  @Input() title: string = '';

  /**
   * Chart data containing the title.
   * @type {Object}
   * @property {string} title - The title of the chart.
   * @memberof TitleComponent
   */
  chartData = {
    title: 'Medals per Country',
  }

  /**
   * Creates an instance of TitleComponent.
   * @param {OlympicService} olympicService - The OlympicService for data retrieval.
   * @memberof TitleComponent
   */
  constructor(private olympicService: OlympicService) { }

  /**
   * Angular lifecycle hook called after the component is initialized.
   * @memberof TitleComponent
   */
  ngOnInit(): void {

  }
}
