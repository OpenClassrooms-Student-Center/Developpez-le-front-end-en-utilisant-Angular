import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor(/*private olympicService: OlympicService*/) {}

  ngOnInit(): void {
    //this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }
}
