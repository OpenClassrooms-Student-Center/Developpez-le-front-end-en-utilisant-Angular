import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  olympicData: any[] = [];
  chartData: any[] = [];
  private olympicDataSubscription: Subscription | undefined;

  constructor(private olympicService: OlympicService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.olympicService.getFormattedOlympics().subscribe(
      formattedData => {
        this.chartData = formattedData;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.olympicDataSubscription) {
      this.olympicDataSubscription.unsubscribe();
    }
  }


  onSelect(event: any) {
    this.router.navigateByUrl(`/swimlane/${event.name}`);

  }

  customTooltipTextFunction(item: any): string {
    return `<strong>Country:</strong> ${item.name} <br> <strong>Medals:</strong> ${item.value}`;
  }
}
