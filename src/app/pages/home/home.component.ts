import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { BrowserModule } from '@angular/platform-browser';
import { Color, NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  public olympic$: Observable<Olympic> | undefined;
  // public olympics$: Observable<any> = of(null);

  public view: any[] = [700, 400];
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    // this.olympics$ = this.olympicService.getOlympics();

    // .pipe(subscribe(
    //   response: any => {
    //     for (const item of response) {
    //       this.results.push(item);
    //     }
    //     this.results = [...this.results];
    //   }
    // );
    // )
    // console.log(this.olympics$);
    this.olympics$ = this.olympicService.getOlympics().subscribe(
      (olympics) => {
        this.olympics$ = of(olympics);
      },
      (error) => {
        console.error(error);
      }
    );

  }


  // options

    // showLabels: boolean = true;
    // isDoughnut: boolean = false;








  // onSelect(): void {
  // }

}
