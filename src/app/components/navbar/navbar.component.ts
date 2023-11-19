import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() barInfo: string = '';
  href: string = '/';
  src: string = '../../../assets/img/telesport-logo.png';
}
