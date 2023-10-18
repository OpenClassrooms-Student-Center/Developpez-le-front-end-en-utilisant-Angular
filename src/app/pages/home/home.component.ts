import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Country, Countries } from 'src/app/core/models/Country';
import { PieChartValue } from 'src/app/core/models/PieChartValue';
import { OlympicService } from 'src/app/core/services/olympic/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$!: Subject<boolean>;
  private CountriesSubscribe! : Subscription;

  public Countries!: Array<Country>;
  public data!: Array<PieChartValue>;
  public nbOfCountries : number = 0;
  public nbOfJOs : number = 0;

  
  single!: any[];



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
    this.CountriesSubscribe = this.olympicService.getCountries().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (Countries : Countries | undefined) => {
        if(!Countries) throw new Error("Countries data can't be undefined or null.");
        
        this.Countries = Countries.map((olympic) => new Country(olympic));
        this.data = this.Countries.map((olympic : Country) => {return {name: olympic.country, value: olympic.getTotalNbMedals()}});
        this.nbOfCountries = this.olympicService.getNumberOfCountry(this.Countries);
        this.nbOfJOs = this.olympicService.getNumberOfJOs(this.Countries);
      },
      error : (error) => {
        console.error("Received an error: " + error);
        // TODO Implement component to display an error occure to user
      }
    });

  }

  ngOnDestroy() : void {
    this.destroy$.next(true);
    this.CountriesSubscribe.unsubscribe();
  }

  colorScheme : {domain: string[]} = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  onSelect(data: PieChartValue): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.router.navigateByUrl(`country/${this.Countries.find((olympic) => olympic.country === data.name)?.id}`)
  }
}
