import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-infobar',
  templateUrl: './infobar.component.html',
  styleUrls: ['./infobar.component.scss']
})
export class InfobarComponent {
  @Input() barInfo: string = '';
}
