import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  
  public olympics$: Observable<Olympic[]> = of([]);
  public olympics: Olympic[] = [];
  public country!: Olympic | undefined;
  public medals: number | undefined = 0;
  public athletes: number | undefined = 0;
  public loaded:boolean=false;


  constructor(private route: ActivatedRoute, private router: Router, private olympicService: OlympicService){

  }

  ngOnInit() {
      let id = parseInt(this.route.snapshot.params['id']);
      this.olympicService.getOlympics().subscribe((olympicData) => {
        if(olympicData.length>0){
          this.country = olympicData.find(country => country.id==id);
          this.loaded=true;
          // If no country found, redirect to error page
          if(this.country==undefined) this.router.navigateByUrl('**')
          
          this.medals= this.country?.participations.map((participation) => {
            return participation.medalsCount
          }).reduce((prev,curr) => prev+curr);
          
          this.athletes=this.country?.participations.map((participation) => {
            return participation.athleteCount
          }).reduce((prev,curr) => prev+curr)
        }

        
      })
  }
}
