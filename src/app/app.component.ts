import { Component, OnInit } from '@angular/core';
import { Screen } from 'src/app/core/models/Screen';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { ResponsiveService } from './core/services/responsive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class ResponsiveAppComponent implements OnInit {

  public small!:boolean;
  public portrait!:boolean;

  constructor(
    private _responsiveService: ResponsiveService,
    private _olympicService: OlympicService) {}

  ngOnInit(): void {
    this._responsiveService.getScreenSize().pipe(take(1)).subscribe(data => this.small = data.matches);
    this._responsiveService.getOrientation().pipe(take(1)).subscribe(result => this.portrait = result.matches);
    this._olympicService.loadInitialData().pipe(take(1)).subscribe();
  }
}
