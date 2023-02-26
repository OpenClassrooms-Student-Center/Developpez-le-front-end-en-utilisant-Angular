import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-card',
  templateUrl: './title-card.component.html',
  styleUrls: ['./title-card.component.scss']
})
export class TitleCardComponent {

  @Input('titleCard') titleCard: string;

  constructor(){
    this.titleCard = '';
  }
}
