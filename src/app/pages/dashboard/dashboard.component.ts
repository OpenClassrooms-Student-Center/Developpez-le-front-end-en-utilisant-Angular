import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private olympicService: OlympicService) {}
  ngOnInit(): void {
        this.getOlympics();
  }
  dataset: any[] = [];
  olympics: Olympic[] = [];
  numberOfJO = 0;
  numberOfCountries = 0;
  title = 'barchartApp';

 onActivate(event: any): void {
    console.log('Activate', event.value);
    this.getInfoCountry(event.value.name);
  }

  getInfoCountry(country : string): void {
    this.numberOfJO = 0;
    this.olympics
              .filter((olympic) => olympic.country === country )
              .forEach(olympic =>
                  {this.numberOfJO += olympic.participations.length;}
              );
  }

  getOlympics(): void {
    this.olympicService.getOlympics().subscribe(olympic => {
    this.olympics = olympic;

    var arrayTmp: any[] = [];
    for (let i=0;i<olympic.length;i++) {
      var totalMedals = 0;
      for (let j=0;j<olympic[i].participations.length;j++) {
          totalMedals += olympic[i].participations[j].medalsCount;
      }
      var obj = {
        "name": olympic[i].country,
        "value": totalMedals
      }
      arrayTmp.push(obj);
    }
    this.dataset = [...arrayTmp];
    });
  }
    /** single: any[];
      view: any[] = [700, 400];

      // options
      gradient: boolean = true;
      showLegend: boolean = true;
      showLabels: boolean = true;
      isDoughnut: boolean = false;
      legendPosition: string = 'below';

      colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
      };

      constructor() {
        Object.assign(this, { single });
      }*/

      /** onSelect(data): void {
        console.log('Item clicked', JSON.parse(JSON.stringify(data)));
      }

      onActivate(data): void {
        console.log('Activate', JSON.parse(JSON.stringify(data)));
      }

      onDeactivate(data): void {
        console.log('Deactivate', JSON.parse(JSON.stringify(data)));
      }*/

       /** getNbUniqueCountries(olympic : Olympic): number {
          alreadySeen: any [] = [];
          var countries = olympic.filter(ol => ol.country.indexOf > -1 ? alreadySeen.push(ol.country) : "").foreach(ol => ol.country);
          console.log(countries);

          olympic.participations.forEach(function(participation) {
                var country = participation.country;
                if (alreadySeen[country]) {
                  console.log(country);
                } else {
                  alreadySeen.push(country);
                 }
              });

          return 5;
        }*/

              /**  Object.keys(olympic).foreach(key => {
                 var obj = {
                  "name": key.country,
                  "value": key.country
                  }
                })*/

}
