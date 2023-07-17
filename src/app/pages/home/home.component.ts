import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  public olympics$: Observable<Olympic[]> = of([]);
  public olympics: Olympic[] = [];
  public maxParticipations: number = 0;
  public olympicsResult: Array<{name:string,value:number,extra:{id:number}}> = [];

  /*
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins:{
      tooltip:{
        backgroundColor: "#04838F",
        padding:{x:20, y:5},
        bodyFont:{weight:"300",family:"system-ui", size:22},
        bodyAlign:"center",
        titleFont:{size:22, weight:"200"},
        usePointStyle:true,
        callbacks:{
          labelPointStyle: () => {
            // get icon image
            const medalIcon = new Image(30,30);
            medalIcon.src="../../../../assets/icons/medal-icon.png";
            return {pointStyle: medalIcon, rotation:0}
          }
        }
      },
    },
  }

  public pieChartCountries: Array<string> = [];
  public countriesMedals: Array<number> = [];
  public pieChartDatasets : Array<{data: Array<number>}>= [];
  //public pieChartLegend = true;
  public pieChartPlugins = [];*/

  currentBreakpoint:"desktop" | "tablet" | "phone" | undefined;

  

  // options
  showLegend: boolean = false;
  showLabels: boolean = true;
  trimLabels:boolean=false;

  gradient: boolean = false;
  isDoughnut: boolean = false;


  


  constructor(
     private olympicService: OlympicService,
     private responsiveService: ResponsiveService,
     private router: Router
  ) {
    
   }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics$()

    this.olympicService.getOlympics().subscribe((olympicData) => {
      this.olympics = olympicData.map((olympic) => {
        return olympic;
      })
      
      if(this.olympics.length>0) {
       /* this.pieChartCountries = this.olympics.map((country) => { return country.country })
        this.olympics.map((olympic) => {
          if(olympic.participations.length>this.maxParticipations) this.maxParticipations = olympic.participations.length
          const medalsParticipations = olympic.participations.map((participations) => {
            return participations.medalsCount;
          }).reduce((prev,curr) => prev+curr);
          this.countriesMedals.push(medalsParticipations)
        })
        this.pieChartDatasets = [{ data: this.countriesMedals }]*/
      }
      this.olympics.map((olympic) => {
        if(olympic.participations.length>this.maxParticipations) this.maxParticipations = olympic.participations.length
        const medalsParticipations = olympic.participations.map((participations) => {
          return participations.medalsCount;
        }).reduce((prev,curr) => prev+curr);
        const { country, id } = olympic;
        const res = {
          name: country,
          value: medalsParticipations,
          extra:{
            id
          }
        };        
        this.olympicsResult.push(res)
      })
    });

    /**
     * Observe current window format : "desktop" | "tablet" | "phone" | undefined
     */
    this.responsiveService.observeBreakpoint().subscribe(() => {
      this.currentBreakpoint = this.responsiveService.breakpointChanged();
    });
  }

  onMouseClick(e:any) {
    const id = e.extra.id;
    this.router.navigateByUrl('/details/'+id)
  }
}
