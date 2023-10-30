import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { single } from './data';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  single!: any[];
  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition!: LegendPosition.Below;

  colorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage'
  };

  constructor(private olympicService: OlympicService) {
    Object.assign(this, { single });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }
}
