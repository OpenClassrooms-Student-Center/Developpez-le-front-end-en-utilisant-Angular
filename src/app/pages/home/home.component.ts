import {Component, inject} from '@angular/core';
import {map, Observable, take, tap} from 'rxjs';
import {AsyncPipe} from "@angular/common";
import {OlympicService} from "@services/olympic.service";
import {Olympics} from "@models/Olympic";
import {TitleComponent} from "@shared/components/title/title.component";
import {TagsComponent} from "@shared/components/tags/tags.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {Router} from "@angular/router";
import { OlympicsLineChart } from "@models/HomeChart";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    TitleComponent,
    TagsComponent,
    NgxChartsModule,
  ]
})
export default class HomeComponent {
  private _olympicService: OlympicService = inject(OlympicService);
  private _router: Router = inject(Router);

  protected numberOfCountry!: number;
  protected numberOfParticipations!: number;

  /**
   * Observable of OlympicsLineChart
   *
   * This observable is used to generate the data for the line chart.
   *
   * @type {Observable<OlympicsLineChart>}
   * @memberof HomeComponent
   *
   * return {Observable<OlympicsLineChart>} The observable olympics$ returns an array of objects, where each object has the following properties:
   *  - id: The ID of the country.
   *  - name: The name of the country.
   *  - value: The total number of medals won by the country.
   */
  protected olympics$: Observable<OlympicsLineChart> = this._olympicService.getOlympics$().pipe(
    tap((olympics: Olympics) => {
      this.numberOfParticipations = olympics.flatMap(o => o.participations).length;
      this.numberOfCountry = olympics.length
    }),
    map((olympics: Olympics) => {
        return olympics.map(olympic => {
          return {
            id: olympic.id,
              name: olympic.country,
              value: olympic.participations.reduce((acc, participation) => acc + participation.medalsCount, 0)
          }
        })
      }
    ));

  /**
   * Navigate to detail
   * @param data object with name, value and label properties
   * @memberof HomeComponent
   *
   * This method is used to navigate to the detail page of the selected country.
   *
   * @returns {void}
   *
   * Important information: This method has a observable with a take(1) operator,
   * which means that it will only take the first value emitted by the observable.
   */
  protected navigateToDetail(data: {name: string, value: number, label: string}): void {
    this.olympics$.pipe(
      take(1),
      map(olympics => olympics.find(olympic => olympic.name === data.name)),
      tap(olympic => this._router.navigate(['', olympic!.id])
      )).subscribe()
  }
}
