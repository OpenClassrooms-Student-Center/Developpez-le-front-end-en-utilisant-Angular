import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { ResponsiveService } from 'src/app/core/services/responsive.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  public olympics: Olympic[] = [];

  currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;

  constructor(private olympicService: OlympicService, private responsiveService: ResponsiveService) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics$()

    this.olympicService.getOlympics().subscribe((olympicData) => {
      this.olympics = olympicData.map((olympic) => {
        return olympic
      })
    });

    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
    });
  }

}
