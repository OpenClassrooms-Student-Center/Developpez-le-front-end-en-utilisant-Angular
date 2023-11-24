import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  olympicData: any[] = [];
  chartData: any[] = [];

  constructor(private olympicService: OlympicService, private http: HttpClient, private router: Router) { }

ngOnInit(): void {
    this.olympicService.getFormattedOlympics().subscribe(
      formattedData => {
        this.chartData = formattedData;
      }
    );
  }
  

  onSelect(event: any) {
    this.router.navigateByUrl(`/swimlane/${event.name}`);

  }

  customTooltipTextFunction(item: any): string {
    return `<strong>Country:</strong> ${item.name} <br> <strong>Medals:</strong> ${item.value}`;
  }
}
