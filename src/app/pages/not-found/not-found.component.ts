import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from 'src/app/core/services/responsive.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  currentBreakpoint: "desktop" | "tablet" | "phone" | undefined;

  constructor(private responsiveService: ResponsiveService) { }

  ngOnInit(): void {
    /**
    * Observe current window format : "desktop" | "tablet" | "phone" | undefined
    */
    this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
    });
  }

}
