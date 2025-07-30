import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OlympicService } from './core/Services/olympic.service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,
    NgxChartsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
  width!: number;
  height!: number;

  constructor(private olympicService: OlympicService) { }

  ngOnInit() {
    this.onResize();
    this.olympicService.loadInitialData().pipe(take(1)).subscribe()
  }
  protected title = 'Olympic-Dashboard';

  // Adjust the chart size on window resize
  @HostListener('window:resize')
  onResize() {
    this.width = Math.min(Math.max(window.innerWidth * 0.6, 300), 900);
    this.height = Math.max(Math.floor(window.innerHeight * 0.6), 400);
  }
}
