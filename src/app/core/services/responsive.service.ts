import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  currentBreakpoint: string = '';

  constructor(private responsive: BreakpointObserver) { }

  /**
   * Observe the current breakpoint
   * @returns Observable<BreakpointState>
   */
  observeBreakpoint(): Observable<BreakpointState> {
    const {  Web,  Tablet,  Handset } = Breakpoints;
    return this.responsive.observe([Web,  Tablet,  Handset ])
  }


  /**
   * Checks if the BreakpointObserver matches either Web | Tablet | Handset
   * @returns "desktop" | "tablet" | "phone" | undefined
   */
  breakpointChanged() : "desktop" | "tablet" | "phone" | undefined {
    if (this.responsive.isMatched(Breakpoints.Web)) {
      return this.currentBreakpoint = "desktop";
    } else if (this.responsive.isMatched(Breakpoints.Tablet)) {
      return this.currentBreakpoint = "tablet";
    } else if (this.responsive.isMatched(Breakpoints.Handset)) {
      return this.currentBreakpoint = "phone";
    }
    return undefined;
  }
}
