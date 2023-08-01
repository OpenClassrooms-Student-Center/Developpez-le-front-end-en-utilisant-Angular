import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ResponsiveService } from 'src/app/core/services/responsive.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentBreakpoint: "desktop" | "tablet" | "phone" | undefined;
  showBackArrow: boolean = false;

  constructor(public router: Router, public route: ActivatedRoute, private responsiveService: ResponsiveService) {
    /**
     * Subscribe to current url path, if it includes '/details/' (located on details page),
     * then showBackArrow is true and shows the back arrow in the header to navigate back
     */
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showBackArrow = event.url.includes('/details/');
      }
    })

  }

  ngOnInit() {
    /**
    * Observe current window format : "desktop" | "tablet" | "phone" | undefined
    */
    this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
    });
  }

  /**
   * Navigate to home
   */
  navigateBack() {
    this.router.navigateByUrl('/home')
  }

}
