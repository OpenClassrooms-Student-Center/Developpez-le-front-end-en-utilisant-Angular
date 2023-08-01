import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/core/services/responsive.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {
  public responsiveSubscription!:Subscription;
  currentBreakpoint: "desktop" | "tablet" | "phone" | undefined;

  constructor(private responsiveService: ResponsiveService) { }

  ngOnInit(): void {
    /**
    * Observe current window format : "desktop" | "tablet" | "phone" | undefined
    */
    this.responsiveSubscription = this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
    });
  }

  ngOnDestroy(): void {
      this.responsiveSubscription.unsubscribe();
  }

}
