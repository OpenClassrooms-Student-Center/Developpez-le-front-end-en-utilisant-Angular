import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { single } from './data';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicMedalsCountViewModel } from 'src/app/core/viewmodels/OlympicMedalsCountViewModel';
import { Participation } from 'src/app/core/models/Participation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  olympics: Olympic[] = [];
  olympicMedalsCountViewModels: OlympicMedalsCountViewModel[] = [];
  numberOfJos: number = 0;
  numberOfCountries: number = 0;

  single!: any[];
  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition!: LegendPosition.Below;

  colorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#8A0886', '#C7B42C', '#0040FF'],
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
    this.olympics$.subscribe(olympicList => {
      this.olympics = olympicList;
      this.setOlympicHomeViewModels();
      this.setNumberOfJos();
      this.setNumberOfCountries();
    });
  }

  getMedalsCountByCountry(id: number) {
    var medalsCount = 0;
    this.olympics.find(o => o.id == id)?.participations.forEach(p => medalsCount += p.medalsCount);
    return medalsCount;
  }

  setOlympicHomeViewModels() {
    this.olympicMedalsCountViewModels = [];
    this.olympics.forEach(o => {
      var olympicMedalsCountViewModel: OlympicMedalsCountViewModel = { name: o.country, value: this.getMedalsCountByCountry(o.id) };
      this.olympicMedalsCountViewModels.push(olympicMedalsCountViewModel);
    })
  }

  setNumberOfJos() {
    var jos: Participation[] = [];
    this.olympics.forEach(o => o.participations.forEach(p => {
      var participation = jos.find(j => j.id === p.id);
      if (!participation) {
        jos.push(p);
      }
    }));
    this.numberOfJos = jos.length;
  }

  setNumberOfCountries() {
    var olympics: Olympic[] = [];
    this.olympics.forEach(ol => {
      var olympic = olympics.find(o => o.id === ol.id);
      if (!olympic)
      {
        olympics.push(ol);
      }
    });
    this.numberOfCountries = olympics.length;
  }
}
