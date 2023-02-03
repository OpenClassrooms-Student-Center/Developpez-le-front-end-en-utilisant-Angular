import { Component, Input } from '@angular/core';

@Component({
  selector: 'telesport-data-block',
  templateUrl: './data-block.component.html',
  styleUrls: ['./data-block.component.scss']
})
export class DataBlockComponent  {

  @Input('label') label: string;
  @Input('value') value: number;

  constructor() {
    this.label = '';
    this.value = 0
   }

}
