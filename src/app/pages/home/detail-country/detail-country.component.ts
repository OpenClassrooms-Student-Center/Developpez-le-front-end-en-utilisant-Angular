import {Component, inject, OnInit} from '@angular/core';
import {OlympicService} from "@services/olympic.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {BehaviorSubject, map, Observable, switchMap, tap} from "rxjs";
import {TagsComponent} from "@shared/components/tags/tags.component";
import {TitleComponent} from "@shared/components/title/title.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {OlympicBarChart} from "@models/DetailChart";

@Component({
  selector: 'app-detail-country',
  imports: [
    AsyncPipe,
    TagsComponent,
    TitleComponent,
    NgxChartsModule,
    RouterLink
  ],
  templateUrl: './detail-country.component.html',
  styleUrl: './detail-country.component.scss',
  standalone: true,
})
export default class DetailCountryComponent implements OnInit{
  private _olympicService: OlympicService =inject(OlympicService);
  private _activatedRouter: ActivatedRoute = inject(ActivatedRoute);
  protected olympic$!: Observable<OlympicBarChart>;

  protected numberOfMedals!: number;
  protected numberOfAthletes!: number;
  protected errorMessage$ = new BehaviorSubject<boolean>(false);

  // This method runs when the component is initialized.
  ngOnInit() {
    // We start by getting the ID of the Olympic event from the current URL parameters.
    this.olympic$ = this._activatedRouter.params.pipe(
      // We use switchMap to change the stream of parameters to a stream of Olympic event details.
      switchMap(params => this._olympicService.getOlympic$(+params['id'])),
      // We use tap to perform side effects on the stream of Olympic event details.
      tap(olympic => {
        // If we have Olympic event details, we calculate the total number of medals and athletes.
        if (olympic) {
          this.numberOfMedals = olympic.participations.reduce((acc, participation) => acc + participation.medalsCount, 0);
          this.numberOfAthletes = olympic.participations.reduce((acc, participation) => acc + participation.athleteCount, 0);
        } else {
          // If there are no Olympic event details, we signal an error.
          this.errorMessage$.next(true);
        }
      }),
      // We use map to transform the stream of Olympic event details into a new format.
      map(olympic => {
        return {
          // We keep the country of the Olympic event.
          country: olympic!.country,
          // We count the number of participations.
          participations: olympic!.participations.length,
          // We create a chart for each participation, showing the year, the number of medals, and the city.
          charts: olympic!.participations.map(participation => {
            return {
              name: participation.year.toString(),
              value: participation.medalsCount,
              extra: {
                city: participation.city,
              }
            };
          })
        };
      })
    );
  }
}
