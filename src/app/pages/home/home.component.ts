import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, pipe, Subscription} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { catchError, map, tap} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {


  // public olympics$ = new Observable<{ name: string; value: number }[]>;
  public olympicData!:{ "name": string; "value": number }[];
  public subscription!: Subscription;


  public view: any = [700, 400];
  public colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;



  constructor(private olympicService: OlympicService) { }

  ngOnInit() {
    this.subscription = this.olympicService.getOlympics().pipe(
      catchError((error) => {
        console.error(error);
        return of([]); // retourne un observable qui émet un tableau vide en cas d'erreur
      }),
    ).subscribe(
      (value) => {this.olympicData = value}
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

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
