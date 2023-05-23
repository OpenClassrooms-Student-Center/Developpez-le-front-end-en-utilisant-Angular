import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  public olympicData!:{name: string; value: number }[];
  public subscription!: Subscription;
  public numberOfJos!: number;
  public numberOfCountries!: number;

  // Pie chart configuration
  public view: [number, number] = [650, 350];
  public colorScheme: Color = {
    name: 'myColorScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#d1e4f0', '#5F264A', '#850E35', '#a48da6', '#93BFCF']
  };

  // Pie chart options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.olympicService.getOlympics().subscribe(
      countriesData => {
        // for display card of some data
        this.numberOfCountries = countriesData?.length;
        this.numberOfJos = countriesData?.[0].participations.length

        // To transform data for the pie chart
        this.olympicData = [];
        countriesData.forEach((country) => {
          this.olympicData.push(
            {
              name: country.country,
              value: country.participations.reduce((totalMedals, participation) => totalMedals + participation.medalsCount, 0)
            }
          )
        })
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Methods onActivate/onDeactivate to display data when the user hover the country in the chart
  onActivate(data: {name: string, value: number}): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
    console.log(`data activate : ${data}`)
  }

  onDeactivate(data: {name: string, value: number}): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    console.log(`data ondeactivate : ${data}`)
  }

  onSelect(data: {name: string, value: number}): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    console.log(`data onselect : ${data}`);

    // To redirect on the detailComponent when the user click on a country in the chart
    const olympicCountry: string = data.name;
    this.router.navigateByUrl(`/${olympicCountry}`);
  }

}
