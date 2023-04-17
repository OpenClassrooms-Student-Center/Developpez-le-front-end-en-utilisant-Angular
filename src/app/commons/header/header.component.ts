import { Component, Input, OnInit } from '@angular/core';
import { wording } from 'src/app/utils/wording';
import { Screen } from 'src/app/core/models/Screen';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @Input() small:boolean = false;
  @Input() portrait:boolean = false;

  public screen!:Screen;
  public wording = wording;

  constructor() {}

  ngOnInit(): void {
    this.screen = new Screen(this.small, this.portrait);
  }
}
