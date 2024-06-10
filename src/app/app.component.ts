import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private olympicService: OlympicService,
              private router: Router) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }

  setCursor() : String {
    return this.router.url === '/' ? 'auto' : 'pointer'
  }

  // Navigate back to the main page if not already on it
  onPageTitleClicked() : void {
    if (this.router.url === '')
      return;
    this.router.navigateByUrl('');
  }
}
