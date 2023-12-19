import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = this.olympicService.getOlympics();
  public pieChartData: any[] = [];
  public numberOfCountries : any = 0;
  public numberOfOlympics : any = 0;

  public colorScheme: any = {
    name: 'custom',
    selectable: true,
    group: 'Ordinal',
    domain: ['#956065', '#B8CBE7', '#89A1DB', '#793D52', '#9780A1'],
  };


  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
   
      this.olympics$.subscribe((olympics) => {
         
        this.pieChartData = olympics.map((country:any) => {
          return {
            name: country.country,
            value: country.participations.reduce(
              (totalMedals:any, participation:any) => totalMedals + participation.medalsCount,
              0
            ),
          };
        });
        this.numberOfOlympics = olympics.reduce(
          (totalOlympics: any, country: any) => totalOlympics = country.participations.length,
          0
        );
         this.numberOfCountries = olympics.length;
      });
     
    }
}
