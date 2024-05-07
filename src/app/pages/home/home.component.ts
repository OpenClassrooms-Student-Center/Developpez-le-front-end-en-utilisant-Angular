import {Component, inject} from '@angular/core';
import {map, Observable, take, tap} from 'rxjs';
import {AsyncPipe} from "@angular/common";
import {OlympicService} from "@services/olympic.service";
import {Olympic, Olympics} from "@models/Olympic";
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

  navigateToDetail(data: {name: string, value: number, label: string}) {
    this.olympics$.pipe(
      take(1),
      map(olympics => olympics.find(olympic => olympic.name === data.name)),
      tap(olympic => this._router.navigate(['', olympic!.id])
      )).subscribe()
  }
}
