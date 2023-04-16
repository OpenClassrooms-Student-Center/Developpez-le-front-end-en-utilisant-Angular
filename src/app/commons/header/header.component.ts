import { Component } from '@angular/core';
import { wording } from 'src/app/utils/wording';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public wording = wording;

}
