import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { wording } from 'src/app/utils/wording';
import { Screen } from 'src/app/core/models/Screen';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {
  
  @Input() size:string = 'Unknown';

  public screen!:Screen;
  public isMobile!:boolean;
  public wording = wording;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.screen = new Screen(this.size, false);
    this.isMobile = this.screen.isSmall;
  }

  get header() {
    return {'header': true,'small': this.screen.isSmall, 'medium': this.screen.isMedium, 'large': this.screen.isLarge}
  }

  get logo() {
    return {'logo': true, 'smallLogo': this.screen.isSmall, 'fullLogo': this.screen.isMedium || this.screen.isLarge}
  }
}
