import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieData } from 'src/app/core/models/PieData';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.scss',
})
export class PieComponent implements OnInit {
  dataChart!: PieData[];
  view: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#a95963', '#a8385d', '#7aa3e5', '#7aa3e5', '#aae3f5'],
  };

  constructor() {
    //Object.assign(this, { single });
  }
  ngOnInit(): void {
    dataChart;
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  public goToDetail(event: {
    name: string;
    value: number;
    label: string;
  }): void {
    const selectCountry = this.olympics.find(
      (olympic) => olympic.country === event.name
    );

    if (selectCountry) {
      this.router.navigate(['/detail', selectCountry.id]);
    }
  }
}
