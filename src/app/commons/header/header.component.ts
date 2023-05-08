import { Component, OnDestroy, OnInit,  } from '@angular/core';
import { wording } from 'src/app/utils/wording';
import { Screen } from 'src/app/core/models/Screen';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { Subject, takeUntil } from 'rxjs';
import { screenSizes } from 'src/app/utils/data-utils';

/**
 * Shared Header.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // private properties used only in the component.
  private _destroyed = new Subject<void>();
  private _size:string = 'Unknown';
  private _isPortrait:boolean = true;
  private _screenSizes = screenSizes;

  // public properties binded to the html template.
  public wording = wording;
  public screen!:Screen;
  public alt:string = "Logo Télésport";
  public logoPath!:string;
  public ringsSrc:string = "../../../assets/images/olympic-rings.png";
  public ringsAlt: string = "Olympic Rings";
  
  /**
   * Dependency injection.
   * @param _responsive Responsive service to observe screen size changes.
   */
  constructor(private _responsive: ResponsiveService) {}

  /**
   * Intialization of the component with subscription to the responsive service.
   */  
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

  /**
   * Component destroyed with notifier unsubscription.
   */
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  /**
   * getters for style classes.
   */
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
