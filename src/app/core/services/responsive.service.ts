import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Service responsible for observing the different breakpoint states of the browser screen while resizing the window.
 */
@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  // Injecting angular BreakpointObserver in the constructor allow us to observe the breakpoints.
  constructor(private _responsive:BreakpointObserver) { }

  /**
   * Function to observe the width of the browser window.
   * @returns an Observable of BreakpointState.
   */
  observeScreenSize(): Observable<BreakpointState> {
    return this._responsive.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]);
  }

  /**
   * Function to observe the orientation of the browser window.
   * @returns an Observable of BreakpointState.
   */
  observeOrientation() : Observable<BreakpointState> {
    return this._responsive.observe('(orientation: portrait)');
  }
}
