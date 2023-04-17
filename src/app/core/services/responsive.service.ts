import { Injectable, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable, distinctUntilChanged, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService implements OnInit {

  readonly breakpointSize$ = this._responsive.observe(Breakpoints.Small).pipe(tap(), distinctUntilChanged());
  readonly breakpointOrientation$ = this._responsive.observe(Breakpoints.HandsetPortrait).pipe(tap(), distinctUntilChanged()); 

  constructor(private _responsive:BreakpointObserver) { }

  ngOnInit(): void {
  }

  public getScreenSize(): Observable<BreakpointState> {
    return this.breakpointSize$;
  }

  public getOrientation(): Observable<BreakpointState> {
    return this.breakpointOrientation$;
  }
}
