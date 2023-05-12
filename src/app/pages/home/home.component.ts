import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
// import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Participations } from 'src/app/core/models/Participation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public olympics$: Observable<Olympic[]> = of([]);
  public olympic$: Observable<Olympic> | undefined;




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


  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics().pipe(
      // Je pense qu'il faut ici filtrer les données que l'on veut afficher
      )
      console.log(this.olympics$)
    // console.log(this.olympics$);
    }


    onActivate(data: any): void {
      console.log('Activate', JSON.parse(JSON.stringify(data)));
    }

    onDeactivate(data: any): void {
      console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }

    onSelect(data: any): void {
      console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    }
  }
