import {Component} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {AsyncPipe, NgIf} from "@angular/common";
import {OlympicService} from "@services/olympic.service";
import {Olympics} from "@models/Olympic";
import {TitleComponent} from "@shared/components/title/title.component";
import {TagsComponent} from "@shared/components/tags/tags.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    TitleComponent,
    TagsComponent,
    NgIf
  ]
})
export default class HomeComponent {
  private _olympicService: OlympicService = new OlympicService();

  protected numberOfCountry!: number;
  protected numberOfMedals!: number;

  protected olympics$: Observable<Olympics> = this._olympicService.getOlympics$().pipe(
    tap((olympics: Olympics) => {
      this.numberOfMedals = olympics.flatMap(o => o.participations)
        .reduce((acc, participation) => acc + participation.medalsCount, 0);
      this.numberOfCountry = olympics.length
    })
  );
}
