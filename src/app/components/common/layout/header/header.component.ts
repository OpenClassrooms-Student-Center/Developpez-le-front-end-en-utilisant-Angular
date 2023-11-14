import { Component } from '@angular/core';
import { SVG_URLS } from 'src/app/public/images/index.images';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  /**
   * URL of the TéléSport logo
   */
  logoUrl: string;
  constructor() {
    this.logoUrl = SVG_URLS.logo;
  }
}
