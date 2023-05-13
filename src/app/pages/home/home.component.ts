import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Participations } from 'src/app/core/models/Participation';
import { map, tap } from 'rxjs/operators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  // public olympics$: Observable<Olympic[]> = of([]);
  public olympics$: Observable<Olympic[]> = of([]);
  // public olympic$: Observable<Olympic> | undefined;



  public view: any = [700, 400];
  public colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  gradient: boolean = false;
  isDoughnut: boolean = false;


  constructor(private olympicService: OlympicService) {
    Object.assign(this, this.olympics$) }


    ngOnInit()  {
      this.olympics$ = this.olympicService.getOlympics()
      .pipe(
        // result =>
        // for(const i of result) {
          //   this.olympics$.push(i);
          // }
          // this.olympics$ = [... this.olympics$];
          )

          //     map((olympics: Olympic[]) => {
            //       olympics.map(olympic => ({
              //         country: olympic.country,
              //         participations: olympic.participations[0].medalsCount
              //       }))
              //     })
              //     ),
              //     tap(olympics => console.log("mon observation dans home ngonini", olympics));

              console.log(this.olympics$);
            }

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
