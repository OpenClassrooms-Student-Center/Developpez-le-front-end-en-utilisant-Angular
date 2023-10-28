import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Country, Countries } from 'src/app/core/models/Country';
import { PieChartValue } from 'src/app/core/models/PieChartValue';
import { OlympicService } from 'src/app/core/services/olympic/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private countriesSubscribe! : Subscription;

  public countries!: Array<Country>;
  public data!: Array<PieChartValue>;
  public nbOfCountries : number = 0;
  public nbOfJOs : number = 0;

  public getScreenWidth!: number;
  public getScreenHeight!: number;

  single!: any[];

  // options
  view: [number, number] = window.innerWidth < 800 ? [window.innerWidth,window.innerWidth] : [window.innerWidth/3,window.innerWidth/3];
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string | any = 'below';
  tooltipDisabled : boolean = true;
  maxLabelLength : number = 22;

  constructor(
    private olympicService: OlympicService,
    private router : Router,
    private toastrService : ToastrService
  ) {}

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    this.countriesSubscribe = this.olympicService.getCountries().subscribe({
      next: (countries : Countries | undefined) => {
        if(countries === undefined) return
        
        this.countries = countries.map((country) => new Country(country));
        this.data = this.countries.map((country : Country) => {return {name: country.country, value: country.getTotalNbMedals()}});
        this.nbOfCountries = this.olympicService.getNumberOfCountry(this.countries);
        this.nbOfJOs = this.olympicService.getNumberOfJOs(this.countries);
      },
      error : (error : Error) => {
        this.showErrorToast(error);
      }
    });

  }

  ngOnDestroy() : void {
    this.countriesSubscribe.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() : void {
    if(window.innerWidth < 800) {
      this.view = [window.innerWidth,window.innerWidth];
    } else {
      this.view = [window.innerWidth/3,window.innerWidth/3];
    }
  }

  colorScheme : {domain: string[]} = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  onSelect(data: PieChartValue): void {
    this.router.navigateByUrl(`country/${this.countries.find((country) => country.country === data.name)?.id}`)
  }

  showErrorToast(error : Error) : void {
    this.toastrService.error(error.message, error.name, {
      progressBar: true,
      closeButton: true,
      progressAnimation: 'decreasing',
      timeOut: 5000,
      newestOnTop: true,
      positionClass: 'toast-bottom-full-width',
      tapToDismiss: true
    });
  }
}
