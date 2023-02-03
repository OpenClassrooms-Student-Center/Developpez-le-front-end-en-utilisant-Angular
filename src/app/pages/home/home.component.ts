import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import OlympicDTO from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<OlympicDTO[]>;

  constructor(private olympicService: OlympicService) {
    this.olympics$ = of([]);
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }
}
