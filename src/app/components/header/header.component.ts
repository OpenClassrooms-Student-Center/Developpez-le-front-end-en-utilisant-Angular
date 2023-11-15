import { Component, Input } from '@angular/core';
import { Header } from 'src/app/core/models/Header';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() header!: Header;
}
