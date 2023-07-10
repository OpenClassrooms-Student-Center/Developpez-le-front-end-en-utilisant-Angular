import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  constructor(private responsive: BreakpointObserver) { }

  observeBreakpoint(): Observable<BreakpointState> {
    const {  Web,  Tablet,  Handset } = Breakpoints;
    return this.responsive.observe([Web,  Tablet,  Handset ])
  }
}
