import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from './../../core/models/Olympic';
import { Participation } from './../../core/models/Participation';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>;
  public participations$!: Observable<Olympic[]>;
  id!: number;
  numberOfCountry: number = 0;
  numberOfMedhal: number = 0;
  numberOfAthlete: number = 0;
  nameOfCountry!: string;

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

    this.participations$ = this.olympicService.getParticipations(this.id);

    this.participations$?.subscribe((data) => {
      const pays = data?.find((elt, i) => elt.id == this.id);
      if (!pays) {
        this.router.navigateByUrl('/');
      } else {
        this.nameOfCountry = pays?.country as string;
        const participations = pays?.participations as Participation[];
        this.numberOfAthlete = participations?.reduce(
          (total, value) => total + value.athleteCount,
          0
        );
        const series = participations?.map((elt) => ({
          value: elt.medalsCount,
          name: elt.year.toFixed(),
        }));
        this.numberOfCountry = series.length;
        this.numberOfMedhal = series.reduce(
          (total, value) => total + value.value,
          0
        );
        this.saleData = [{ name: pays?.country, series: series }];
      }
    });
  }
}
