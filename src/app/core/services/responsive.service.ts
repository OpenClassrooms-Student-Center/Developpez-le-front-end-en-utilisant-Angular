import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  currentBreakpoint: any= '';

  constructor(private responsive: BreakpointObserver) { }

  observeBreakpoint() {
    const {  Web,  Tablet,  Handset } = Breakpoints;
    return this.responsive.observe([Web,  Tablet,  Handset ])
  }

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
