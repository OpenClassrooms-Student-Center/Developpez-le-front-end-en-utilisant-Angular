import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit
{
  countryName!: String;
  entriesCount!: Number;
  medalsCount!: Number;
  athleteCount!: Number;

  data!: { name : String, series : { name : String, value : Number }[] };
  xAxisLabel: string = 'Dates';
  colorScheme: any = {domain: ['#89A1DB']}

  constructor(private olympicService: OlympicService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    // Fetch olympic from route
    let countryName: string = this.route.snapshot.params['countryName'];
    this.olympicService.getOlympics().pipe(map((olympics : Olympic[]) => olympics.find(o => o.country === countryName))).subscribe(data => this.onOlympicsFetched(data));
  }

  onBackButtonClicked() : void {
    this.router.navigateByUrl('');
  }

  private onOlympicsFetched(data : Olympic | undefined) {
    // Navigate to NotFound Page if data is undefined
    if (data === undefined){
      this.router.navigateByUrl('**');
      return;
    }

    this.countryName = data.country;

    // If the country has no participations we can just stay with 0 everywhere
    if (data.participations === undefined)
      return;

    this.entriesCount = data.participations.length;
    this.medalsCount = data.participations.reduce((sum: number, p: { medalsCount: number }) => sum + p.medalsCount, 0);
    this.athleteCount = data.participations.reduce((sum: number, p: { athleteCount: number }) => sum + p.athleteCount, 0);

    this.data = this.formatOlympic(data);
    console.log(data);
  }

  private formatOlympic(olympic: Olympic) : any {
    return [{
      name : olympic.country,
      series : olympic.participations?.map(p => ({
        name : p.year,
        value : p.medalsCount
      }))
    }];
  }
}
