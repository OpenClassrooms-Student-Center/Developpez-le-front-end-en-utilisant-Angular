import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AsyncPipe} from "@angular/common";
import {OlympicService} from "@services/olympic.service";
import {Olympics} from "@models/Olympic";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe
  ]
})
export class HomeComponent {
  private _olympicService: OlympicService = new OlympicService();

  protected olympics$: Observable<Olympics> = this._olympicService.getOlympics$();
}
