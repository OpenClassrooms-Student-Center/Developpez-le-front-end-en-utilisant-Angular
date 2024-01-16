import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from './../../core/models/Olympic';
import { Participation } from './../../core/models/Participation';
import { Component, OnInit } from '@angular/core';
import { filter, Observable, map } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>;
  public participations$!: Observable<Participation[]>;
  id!: number;

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  saleData: any[] = [];
  yAxisLabel!: string;
  showYAxisLabel = true;
  view = [1500, 500];
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    //this.olympics$ = this.olympicService.getOlympics();

    this.participations$ = this.olympicService.getParticipations(this.id);

    console.log(this.id);
    //console.log(this.participations$);
    this.participations$.subscribe((data) =>
      data.map((country) => {
        console.log(country);
      })
    );
  }

  private resizeChart(width: any): void {
    this.view = [width, 320];
  }
}
