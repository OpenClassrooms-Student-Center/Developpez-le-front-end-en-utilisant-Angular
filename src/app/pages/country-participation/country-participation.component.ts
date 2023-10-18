import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/core/models/Country';
import { OlympicService } from 'src/app/core/services/olympic/olympic.service';

@Component({
  selector: 'app-country-participation',
  templateUrl: './country-participation.component.html',
  styleUrls: ['./country-participation.component.scss']
})
export class CountryParticipationComponent implements OnInit, OnDestroy {
  private countrieSubscribe! : Subscription;

  country! : Country | undefined;


  // Line Chart Options
  showXAxisLabel : boolean = true;
  showYAxisLabel : boolean = false;
  xAxis : boolean = true;
  yAxis : boolean = true;
  xAxisLabel : string = 'Dates';
  timeline : boolean = true;
  autoScale : boolean = true;
  multi : Array<lineChartData> = [];

  constructor(
    private olympicService: OlympicService,
    private route : ActivatedRoute,
    private router : Router
    ) {}

  ngOnInit(): void {
    let id : number = +this.route.snapshot.params['id'];

    this.countrieSubscribe = this.olympicService.getCountry(id).subscribe({
      next: (country) => {
        this.country = country;
        if(country) {
          let series : {name: string, value : number}[] = country.participations.map((partition) => ({name: String(partition.year), value: partition.medalsCount }))
          this.multi = [{
            name : country!.country,
            series: series
          }]
        }
      },
      error: (error) => {
        console.error("Received an error: " + error);
        // TODO Implement component to display an error occure to user
      }
    });
  }

  ngOnDestroy(): void {
    this.countrieSubscribe.unsubscribe();
  }

  goBack(): void {
    this.router.navigateByUrl('');
  }

};

type lineChartData = {
  name : string,
  series: Array<{name : string, value: any}>
};
