import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  constructor(private _responsive:BreakpointObserver) { }

  observeScreenSize(): Observable<BreakpointState> {
    return this._responsive.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]);
  }

  observeOrientation() : Observable<BreakpointState> {
    return this._responsive.observe('(orientation: portrait)');
  }
}
