import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { single } from './data';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicMedalsCount } from 'src/app/core/viewmodels/OlympicMedalsCount';
import { Participation } from 'src/app/core/models/Participation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[]> = of([]);
  olympics: Olympic[] = [];
  olympicMedalsCounts: OlympicMedalsCount[] = [];
  numberOfJos: number = 0;
  numberOfCountries: number = 0;
  subscription: Subscription | undefined;

  single!: any[];
  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition!: LegendPosition.Below;

  colorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#8A0886', '#C7B42C', '#0040FF'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage'
  };

  constructor(private olympicService: OlympicService, private router: Router) {
    Object.assign(this, { single });
  }

  onSelect(data: { name: string, value: number, label: string }): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    var olympic = this.olympicService.getOlympicByCountry(data.name, this.olympics);
    if (olympic) {
      this.router.navigateByUrl(`detail/${olympic.id}`);
    }
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.subscription = this.olympics$.subscribe(olympicList => {
      this.olympics = olympicList;
      this.setValues();
    });
  }

  setValues(): void {
    this.setOlympicMedalsCounts();
    this.setNumberOfJos();
    this.setNumberOfCountries();
  }

  setOlympicMedalsCounts(): void {
    this.olympicMedalsCounts = [];
    this.olympics.forEach(o => {
      this.olympicMedalsCounts.push({
        name: o.country,
        value: this.olympicService.getMedalsCountByOlympicId(o.id, this.olympics)
      });
    });
  }

  setNumberOfJos(): void {
    this.numberOfJos = this.olympicService.getNumberOfJos(this.olympics);
  }

  setNumberOfCountries(): void {
    this.numberOfCountries = this.olympicService.getNumberOfCountries(this.olympics);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
