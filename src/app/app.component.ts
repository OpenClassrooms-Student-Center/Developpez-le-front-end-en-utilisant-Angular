import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subject, distinctUntilChanged, take, takeUntil, tap } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class ResponsiveAppComponent implements OnInit, OnDestroy {

  private _destroyed = new Subject<void>();
  public currentScreenSize!: string;
  private _displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);
  
  constructor(
    private _responsive:BreakpointObserver,
    private _olympicService: OlympicService) {
      this._responsive.observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this._destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this._displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
    }

  ngOnInit(): void {
    this._olympicService.loadInitialData().pipe(take(1)).subscribe();
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
