import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderDetailComponent } from '../header-detail/header-detail.component';
import { Observable } from 'rxjs';
import { HeaderDetails } from 'src/app/core/models/HeaderDetail';
import { Header } from 'src/app/core/models/Header';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule, HeaderDetailComponent],
})
export class HeaderComponent implements OnInit {
  @Input() header!: Header;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
