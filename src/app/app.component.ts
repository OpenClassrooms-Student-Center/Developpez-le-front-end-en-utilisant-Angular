import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class ResponsiveAppComponent implements OnInit {
  
  constructor(
    private _olympicService: OlympicService) { }

  ngOnInit(): void {
    this._olympicService.loadInitialData().pipe(take(1)).subscribe();
  }
}
