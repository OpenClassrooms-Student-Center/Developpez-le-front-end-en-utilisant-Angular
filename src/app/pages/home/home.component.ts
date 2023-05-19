import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, pipe, Subscription} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { catchError, map, tap, mergeMap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Olympic } from 'src/app/core/models/Olympic';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {


  // public olympics$ = new Observable<{ name: string; value: number }[]>;
  public olympicData!:{ "name": string; "value": number }[];
  public subscription!: Subscription;
  public subscription2!: Subscription;
  public subscription3!: Subscription;
  public numberOfJos!: number;
  public numberOfCountries!: number;
  public olympics$!: Observable<Olympic[]>;



  public view: any = [700, 400];
  public colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;



  constructor(private olympicService: OlympicService, private router: Router) { }

  ngOnInit() {
    // for the pie chart
    this.subscription = this.olympicService.getDataPieChart().pipe(
      catchError((error) => {
        console.error(error);
        return of([]); // retourne un observable qui émet un tableau vide en cas d'erreur
      }),
    ).subscribe(
      (value) => {this.olympicData = value}
    );

    this.subscription2 = this.olympicService.getNumberOfJo().subscribe((number) => {
      this.numberOfJos = number;
    });

    this.subscription3 = this.olympicService.getNumberOfCountry().subscribe((number) => {
      this.numberOfCountries = number;
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
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
      console.log(`data onselect : ${data}`);


      const olympicCountry = data.name; // Remplacez "name" par la propriété réelle de votre objet olympique

      this.olympicService.getOlympics().subscribe((olympics: Olympic[]) => {
        const olympic = olympics.find((o) => o.country === olympicCountry);
        if (olympic) {
          const olympicId = olympic.id;
          this.router.navigate([olympicId]);
        }
      });

  }
}
