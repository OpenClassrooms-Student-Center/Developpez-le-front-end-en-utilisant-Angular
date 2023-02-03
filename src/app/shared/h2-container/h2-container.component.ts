import { Component, Input, } from '@angular/core';

@Component({
  selector: 'telesport-h2-container',
  templateUrl: './h2-container.component.html',
  styleUrls: ['./h2-container.component.scss']
})
export class H2ContainerComponent {
  @Input('value') value: string;
  constructor() {
    this.value = '';
  }
}
