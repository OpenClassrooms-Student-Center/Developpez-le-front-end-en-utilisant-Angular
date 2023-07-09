import { Component, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  public olympics : Olympic[] = []

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics$()

    this.olympicService.getOlympics().subscribe((data) => {
      this.olympics=data.map((olympic) => {
        return olympic
      })
      //console.log(this.olympics);
    });
    
    
  }

}
