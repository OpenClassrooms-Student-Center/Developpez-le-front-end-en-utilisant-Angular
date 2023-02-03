import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
@Component({
  selector: 'telesport-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public displayGoBack$: Observable<boolean>;

  constructor(private router: Router) {
    this.displayGoBack$ = of(false);
  }

  ngOnInit(): void {
    this.displayGoBack$ = this.router.events
      .pipe(
        filter(routerEvent => routerEvent instanceof NavigationStart),
        map(routerEvent => (routerEvent as NavigationStart).url !== '/')
      )
  }
}
