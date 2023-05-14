import { Component, OnInit } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Participations } from 'src/app/core/models/Participation';
import { map, tap} from 'rxjs/operators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public olympics$: Observable<Olympic[]> = of([]);
  public olympic!: Olympic;
  public olympics!: Olympic[];
  // public participations!: Participations[];

  public view: any = [700, 400];
  public colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';


  constructor(private olympicService: OlympicService) {
    (Object.assign(this, this.olympics$)) }


    ngOnInit()  {
      console.log("bonjour", this.olympics$ ),
      this.olympics$ = this.olympicService.getOlympics()
        .pipe(
          tap(value => console.log(`mon observable avant map: ${value}`)),
          map((olympics: Olympic[]) => {
              olympics.map((olympic: Olympic) => ({
                country: olympic.country,
                participations: this.totalMedalsCount()
              }))
              return olympics
            }),
          tap(value => console.log(`mon observable après map: ${value}`))
          )
      }


    totalMedalsCount(): number {
      let totalMedals = 0
      for(let i = 0; i < this.olympic.participations.length; i++) {
        totalMedals += this.olympic.participations[i].medalsCount;
      }
      return totalMedals;
    }

    // filterOlympic() {
    //   this.olympics.map((olympic: Olympic) => ({
    //     country: olympic.country,
    //     participations: this.totalMedalsCount()
    //   }))
    //   return this.olympics;
    // }


    public data: Observable<Olympic[]> =this.olympics$;

    onActivate(data: any): void {
      console.log('Activate', JSON.parse(JSON.stringify(data)));
      console.log(`data activate : ${data}`)
    }

    onDeactivate(data: any): void {
      console.log('Deactivate', JSON.parse(JSON.stringify(data)));
      console.log(`data ondeactivate : ${data}`)
    }

    onSelect(data: any): void {
      console.log('Item clicked', JSON.parse(JSON.stringify(data)));
      console.log(`data onselect : ${data}`)
    }
  }
