import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicMedalsCount } from 'src/app/core/viewmodels/OlympicMedalsCount';
import { Router } from '@angular/router';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { DataValue } from 'src/app/core/viewmodels/DataValue';

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

  currentTitle: string = '';
  numberOfJosLabel: string = '';
  numberOfCountriesLabel: string = '';
  numberOfJosText: string = '';
  numberOfCountriesText: string = '';
  faMedalIcon = faMedal;
  infoMessage: string = '';

  //Pie chart properties ---------------------------------------------
  view: [number, number] = [700, 400];

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
  // ------------------------------------------------------------------

  constructor(private olympicService: OlympicService, private router: Router) {
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.subscription = this.olympics$.subscribe({
      next: (olympicList) => {
        this.olympics = olympicList;
        this.setPage();
      },
      error: () => {
        this.infoMessage = "Homepage loading error";
      },
    });
  }

  setPage(): void {
    this.setValues();
    this.setChildrenComponentValues();
    this.infoMessage = "Homepage data loaded";
  }

  setValues(): void {
    this.setOlympicMedalsCounts();
    this.setNumberOfJos();
    this.setNumberOfCountries();
  }

  setChildrenComponentValues(): void {
    this.currentTitle = 'Medals per Country';
    this.numberOfJosLabel = 'Number of JOs';
    this.numberOfCountriesLabel = 'Number of Countries';
    this.numberOfJosText = this.numberOfJos.toString();
    this.numberOfCountriesText = this.numberOfCountries.toString();
  }

  // The pie chart needs a set of values. Each value must contain a name (string) attribute and a value (number) attribute.
  // This method takes values from Olympic set to create a set of values to insert into the pie chart.
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

  onSelect(data: DataValue): void {
    var olympic = this.olympicService.getOlympicByCountry(data.name, this.olympics);
    olympic ? this.router.navigateByUrl(`detail/${olympic.id}`) : this.router.navigateByUrl(`notfound`);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
