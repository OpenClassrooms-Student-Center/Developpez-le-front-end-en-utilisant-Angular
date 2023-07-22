import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, delay, of, takeUntil } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ResponsiveService } from 'src/app/core/services/responsive.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {

  destroyed = new Subject<void>()
  public olympics$: Observable<Olympic[]> = of([]);
  public olympics: Olympic[] = [];
  public country: Olympic | undefined;
  public medals: number | undefined = 0;
  public athletes: number | undefined = 0;
  public loaded: boolean = false;
  currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;

  public countryInfo: Array<
    {
      name: string | undefined,
      series: Array<
        {
          value: number,
          name: string
        }
      > | undefined
    }
  > = [];

  // line chart attributes
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  yScaleMin!: number;
  yScaleMax!: number;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  timeline: boolean = false;
  autoScale: boolean = true;

  width:number=800;
  height:number=600;
  view:[number,number]=[this.width,this.height]


  constructor(private route: ActivatedRoute, private router: Router, private olympicService: OlympicService, private responsiveService: ResponsiveService) {
    /**
     * Get width and height values to set the line chart dimensions (this.view variable) 
     */
    this.width= innerWidth / 1.35;
    this.height=this.width/1.3;
    if(this.width>800) this.width=800
    if(this.height>600) this.height=600
    this.view = [this.width, this.height];
  }

  ngOnInit() {
    // get the params id
    let id = parseInt(this.route.snapshot.params['id']);

    // get all countries 
    this.olympicService.getOlympics().pipe(takeUntil(this.destroyed)).subscribe((olympicData) => {
      if (olympicData.length > 0) {
        // find country by id
        this.country = olympicData.find(country => country.id == id);
        this.loaded = true;

        // If no country found, redirect to error page
        if (this.country == undefined) {
          this.router.navigateByUrl('**')
        } else {
          
          // count all country medals
          this.medals = this.country.participations.map((participation) => {
            return participation.medalsCount
          }).reduce((prev, curr) => prev + curr);

          // count all country athletes
          this.athletes = this.country.participations.map((participation) => {
            return participation.athleteCount
          }).reduce((prev, curr) => prev + curr);


          /**
           * Get min and max medals to set the y scale
           */
          const medalsCount: number[] = this.country.participations.map((p) => {return p.medalsCount})
          let max = Math.max(...medalsCount);
          let min = Math.min(...medalsCount);
          let delta = Math.floor(max - min);
          this.yScaleMin = Math.floor(min - delta*0.2);
          this.yScaleMax =Math.floor(max + delta*0.2)

          /**
           * Expected series data format : array of objects 
           * value key : number (total of country medals won)
           * name key : string (participation year)
           */
          const series = this.country.participations.map((participation) => {
            return {
              value: participation.medalsCount,
              name: participation.year.toString()
            }
          })

          /**
           * Expected country data format : object
           * name key : string (name of the country)
           * series key : array of objects 
           */
          const country = {
            name: this.country.country,
            series,
          }
          // Single country object expected because we want single country
          this.countryInfo.push(country);
        }
      }
    })



    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveService.observeBreakpoint().pipe(takeUntil(this.destroyed)).subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
    });    


    
  }

  ngOnDestroy(): void {
      this.destroyed.next();
      this.destroyed.complete()
  }

  /**
   * Get width and height values to resize the line chart dimensions (this.view variable)
   * @param event 
   */
  onResize(event: any) {
    this.width = event.target.innerWidth / 1.35;
    this.height = this.width/1.3;
    if(this.width>800) this.width=800
    if(this.height>600) this.height=600
    this.view = [this.width, this.height];
  }
}
