import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, of, take, takeUntil } from 'rxjs';
import { DtrOlympic, Olympic, Olympics } from 'src/app/core/models/Olympic';
import { PieChartValue } from 'src/app/core/models/PieChartValue';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$!: Subject<boolean>;
  private olympicsSubscribe! : Subscription;

  public olympics$: Observable<Olympics> = of(null);
  public olympics!: Array<Olympic>;
  public data!: Array<PieChartValue>;

  
  single!: any[];
  view: [number,number] = [700, 400];

  // options
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  constructor(
    private olympicService: OlympicService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.olympics$ = this.olympicService.getOlympics();
    this.olympicsSubscribe = this.olympics$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (olympics : Olympics) => {
        if(!olympics) return
        this.olympics = olympics.map((olympic) => new Olympic(olympic));
        this.data = this.olympics.map((olympic : Olympic) => {return {name: olympic.country, value: olympic.getNbOfParticipation()}});
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
