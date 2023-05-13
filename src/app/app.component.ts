import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class ResponsiveAppComponent implements OnInit, OnDestroy {

  private _destroyed = new Subject<void>();
  
  constructor(private _olympicService: OlympicService) { }

  ngOnInit(): void {
    this._olympicService.loadInitialData().pipe(takeUntil(this._destroyed)).subscribe();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete()
  }
}
