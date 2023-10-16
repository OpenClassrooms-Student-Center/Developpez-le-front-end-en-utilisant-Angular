import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, of, take, takeUntil } from 'rxjs';
import { Olympic, Olympics } from 'src/app/core/models/Olympic';
import { PieChartValue } from 'src/app/core/models/PieChartValue';
import { OlympicService } from 'src/app/core/services/olympic/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$!: Subject<boolean>;
  private olympicsSubscribe! : Subscription;

  public olympics!: Array<Olympic>;
  public data!: Array<PieChartValue>;
  public nbOfCountries : number = 0;
  public nbOfJOs : number = 0;

  
  single!: any[];
  view: [number,number] = [700, 400];



  // options
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  tooltipDisabled : boolean = true;

  constructor(
    private olympicService: OlympicService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.olympicsSubscribe = this.olympicService.getOlympics().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (olympics : Olympics | undefined) => {
        if(!olympics) throw new Error("Olympics data can't be undefined or null.");
        
        this.olympics = olympics.map((olympic) => new Olympic(olympic));
        this.data = this.olympics.map((olympic : Olympic) => {return {name: olympic.country, value: olympic.getNbOfParticipation()}});
        this.nbOfCountries = this.olympicService.getNumberOfCountry(this.olympics);
        this.nbOfJOs = this.olympicService.getNumberOfJOs(this.olympics);
      },
      error : (error) => {
        console.error("Received an error: " + error);
        // TODO Implement component to display an error occure to user
      }
    });

  }

  ngOnDestroy() : void {
    this.destroy$.next(true);
    this.olympicsSubscribe.unsubscribe();
  }

  colorScheme : {domain: string[]} = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  onSelect(data: PieChartValue): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.router.navigateByUrl(`country/${this.olympics.find((olympic) => olympic.country === data.name)?.id}`)
  }
}
