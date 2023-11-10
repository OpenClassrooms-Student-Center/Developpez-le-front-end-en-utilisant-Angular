import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderDetails } from 'src/app/core/models/HeaderDetail';

@Component({
  selector: 'app-header-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-detail.component.html',
  styleUrl: './header-detail.component.scss',
})
export class HeaderDetailComponent implements OnInit {
  @Input() headerDetails!: HeaderDetails;
  ngOnInit(): void {
    /*this.headerDetails.description = 'test';
    this.headerDetails.value = 2;*/
  }
}
