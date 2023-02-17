import { Subscription } from 'rxjs';
import { OlympicService } from './../../core/services/olympic.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-country-data',
  templateUrl: './country-data.component.html',
  styleUrls: ['./country-data.component.css']
})
export class CountryDataComponent implements OnInit {

  countryId!: number;
  countryName!: string;
  countryEntries!: number;
  countryMedalsCount!: number;
  countryAthletesCount!: number;
  countryJoYears!: number[];
  countryMedalsPerJo!: number[];

  countryDataSubscription!: Subscription;

  constructor(private OlympicService: OlympicService, private route: ActivatedRoute) { }

  ngOnInit(): void {


    this.countryId = +(this.route.snapshot.params['id']);
    this.countryMedalsCount = 0;
    this.countryAthletesCount = 0;
    this.countryJoYears = [];
    this.countryMedalsPerJo = [];

    this.countryDataSubscription = this.OlympicService.getOlympicCountry(this.countryId).subscribe(
      {
        next: (Olympic) => {
          this.countryName = String(Olympic?.country);
          this.countryEntries = Number(Olympic?.participations.length);

          Olympic?.participations.forEach(participation => {
                          this.countryMedalsCount += participation.medalsCount;
                          this.countryAthletesCount += participation.athleteCount

                          this.countryJoYears.push(participation.year);
                          this.countryMedalsPerJo.push(participation.medalsCount);

                        } )
        },
          error: err => console.error('An error occurend', err),
          complete: () => console.log('Completed')
      }


    )
  }

  ngOnDestroy(): void {
    this.countryDataSubscription.unsubscribe();
  }

}
