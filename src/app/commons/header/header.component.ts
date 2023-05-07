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

  public wording = wording;
  
  private _destroyed = new Subject<void>();
  private _size:string = 'Unknown';
  private _isPortrait:boolean = true;
  private _screenSizes = screenSizes;
  public screen!:Screen;
  public alt:string = "Logo Télésport";
  public logoPath!:string;
  public ringsSrc:string = "../../../assets/images/olympic-rings.png";
  public ringsAlt: string = "Olympic Rings";
  
  constructor(private _responsive: ResponsiveService) {}

  ngOnInit(): void {
    this._responsive.observeScreenSize()
    .pipe(takeUntil(this._destroyed))
    .subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this._size = this._screenSizes.get(query) ?? 'Unknown';
          this.screen = new Screen(this._size, this._isPortrait);
        }
      }
    });
    this._responsive.observeOrientation()
    .pipe(takeUntil(this._destroyed))
    .subscribe(result => { 
      this._isPortrait = result.matches;
      this.screen = new Screen(this._size, this._isPortrait);
      this.logoPath = this.screen?.isPortrait ?  "./assets/images/telesport-logo-38-noir.png" : "./assets/images/telesport-logo-200-noir.png";
    });
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get header() {
    return { 'header': true,'small': this.screen.isSmall, 'medium': this.screen.isMedium, 'large': this.screen.isLarge}
  }

  get rainbow() {
    return { 'rainbow': true, 'small-rainbow': this.screen?.isSmall, 'medium-and-large-rainbow': !this.screen?.isSmall }
  }

  get logo() {
    return { 'logo': true, 'small-logo': this.screen?.isSmall, 'full-logo': this.screen?.isMedium || this.screen?.isLarge }
  }

  get rings() {
    return { 'small-rings': this.screen?.isSmall, 'medium-rings': this.screen?.isMedium, 'large-rings': this.screen?.isLarge }
  }
}
