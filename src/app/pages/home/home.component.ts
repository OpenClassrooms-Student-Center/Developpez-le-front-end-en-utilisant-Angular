import {Component, inject} from '@angular/core';
import {map, tap} from 'rxjs';
import {AsyncPipe} from "@angular/common";
import {OlympicService} from "@services/olympic.service";
import {Olympics} from "@models/Olympic";
import {TitleComponent} from "@shared/components/title/title.component";
import {TagsComponent} from "@shared/components/tags/tags.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {Router} from "@angular/router";

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

  protected olympics$ = this._olympicService.getOlympics$().pipe(
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

  navigateToDetail(data: any) {
    console.log(data)
    this.olympics$.pipe(
      map(olympics => olympics.find(olympic => olympic.name === data.name)),
      tap(olympic => this._router.navigate(['', olympic!.id])
      )).subscribe()
  }
}
