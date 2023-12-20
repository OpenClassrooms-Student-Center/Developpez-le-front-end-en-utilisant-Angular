import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';

@Component({
  selector: 'app-detail-line',
  templateUrl: './detail-line.component.html',
  styleUrls: ['./detail-line.component.scss']
})
export class DetailLineComponent implements OnInit {
  @Input() countryName: any;
  @Input() totalMedals: any;
  @Input() totalAthletes: any;

  public olympics$: Observable<any> = this.olympicService.getOlympics();
  public lineChartData: any[] = [];
  public numberOfAthletes: any;
  public numberOfMedals: any;
  public numberOfParticipations : any;

  legend: boolean = false;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Nombre de médailles';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  formatXAxisTick(value: any): string {
    return String(value);
  }

  constructor(private olympicService: OlympicService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params) => {
     
      this.countryName = params.get('countryName');

      this.olympics$.subscribe((olympics) => {
       
        const selectedCountry = olympics.find(
          (country: any) => country.country === this.countryName
        );

        if (selectedCountry) {
          this.numberOfMedals = selectedCountry.participations.reduce((totalMedals:any, participation:any) => totalMedals + participation.medalsCount,
          0);
          this.numberOfAthletes = selectedCountry.participations.reduce((totalAthletes:any, participation:any) => totalAthletes + participation.athleteCount,
          0);
          this.numberOfParticipations = selectedCountry.participations.length;
          

        
          this.lineChartData = [
            {
              name: selectedCountry.country,
              series: selectedCountry.participations.map(
                (participation: any) => ({
                  name: participation.year,
                  value: participation.medalsCount,
                })
              ),
            },
          ];
        }
      });
    });
  }

}
