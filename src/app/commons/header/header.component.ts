import { Component, OnDestroy, OnInit,  } from '@angular/core';
import { wording } from 'src/app/utils/wording';
import { Screen } from 'src/app/core/models/Screen';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { Subject, takeUntil } from 'rxjs';
import { screenSizes } from 'src/app/utils/data-utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  private _destroyed = new Subject<void>();
  
  public size:string = 'Unknown';
  public isPortrait:boolean = true;
  private _screenSizes = screenSizes;

  public screen!:Screen;
  public wording = wording;

  constructor(private _responsive: ResponsiveService) {}

  ngOnInit(): void {
    this._responsive.observeScreenSize()
    .pipe(takeUntil(this._destroyed))
    .subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.size = this._screenSizes.get(query) ?? 'Unknown';
          this.screen = new Screen(this.size, this.isPortrait);
        }
      }
    });
    this._responsive.observeOrientation()
    .pipe(takeUntil(this._destroyed))
    .subscribe(result => { 
      this.isPortrait = result.matches;
      this.screen = new Screen(this.size, this.isPortrait);
    });
    console.log(this.screen)
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get header() {
    return {'header': true,'small': this.screen.isSmall, 'medium': this.screen.isMedium, 'large': this.screen.isLarge}
  }

  get logo() {
    return {'logo': true, 'smallLogo': this.screen.isSmall, 'fullLogo': this.screen.isMedium || this.screen.isLarge}
  }
}
