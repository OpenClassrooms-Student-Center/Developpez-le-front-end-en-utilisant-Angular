import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { Olympics } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympics> = of(null);
  public olympics!: Olympics;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.pipe(
      take(1),
    ).subscribe({
      next: (value) => {
        this.olympics = value
      },
      error : (error) => {
        console.error("Received an error: " + error);
      }
    })
  }

  ngOnDestroy() : void {

  }
}
