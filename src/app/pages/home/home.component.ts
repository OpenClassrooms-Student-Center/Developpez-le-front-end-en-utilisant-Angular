import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  destroyed = new Subject<void>()
  public olympics$: Observable<Olympic[]> = of([]);
  public olympics: Olympic[] = [];
  public maxParticipations: number = 0;
  public olympicsResult: Array<{name:string,value:number,extra:{id:number}}> = [];
  public loaded:boolean=false;
  currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;
  
  // pie chart attributes
  showLegend: boolean = false;
  showLabels: boolean = true;
  trimLabels:boolean=false;

  gradient: boolean = false;
  isDoughnut: boolean = false;

  width:number=800;
  height:number=600;
  view:[number,number]=[this.width,this.height]

  constructor(
     private olympicService: OlympicService,
     private responsiveService: ResponsiveService,
     private router: Router
  ) {
    /**
     * Get width and height values to set the line chart dimensions (this.view variable) 
     */
    this.width= innerWidth / 1.35;
    this.height=this.width/1.3;
    if(this.width>800) this.width=800
    if(this.height>600) this.height=600
    this.view = [this.width, this.height];
   }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics$()

    // get all countries
    this.olympicService.getOlympics().subscribe((olympicData) => {
      this.olympics = olympicData.map((olympic) => {
        return olympic;
      })
      
      if(this.olympics.length>0) {
        this.loaded=true
      }
      this.olympics.map((olympic) => {
        if(olympic.participations.length>this.maxParticipations) this.maxParticipations = olympic.participations.length
        
        // count all medals for every countries
        const medalsParticipations = olympic.participations.map((participations) => {
          return participations.medalsCount;
        }).reduce((prev,curr) => prev+curr);
        
        const { country, id } = olympic;


        /**
         * Expected countries data format: object
         * name key : string (name of the country)
         * value key : number (total of country medals won)
         * extra key : object (others optionnals keys)
         */
        const countries = {
          name: country,
          value: medalsParticipations,
          extra:{
            id
          }
        };        
        this.olympicsResult.push(countries)
      })
    });

    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete()
}

  /**
   * Navigate to country details page by id
   * @param e 
   */
  onMouseClick(e:any) {
    const id = e.extra.id;
    this.router.navigateByUrl('/details/'+id)
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
