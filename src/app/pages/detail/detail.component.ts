import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable, of, map } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService,
    private router: Router
  ) {}

  // Initialisation page
  country!: string;
  pageTitle!: string;

  // Initialisation des donnees pour les bulles d'info
  info1 = 'Number of entries';
  numberOfEntries!: number;
  info2 = 'Total number medals';
  numberOfMedals!: number;
  info3 = 'Total number of athletes';
  numberOfAthletes!: number;

  // Initialisation des observables
  public olympics$: Observable<Olympic[]> = of([]);
  public medalsPerYear$: Observable<
    { name: string; series: { name: string; value: number }[] }[]
  > = of([]);

  // LINE CHART options
  legend: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';

  ngOnInit(): void {
    this.country = this.route.snapshot.paramMap.get('country')!;
    this.pageTitle = this.country;

    const resolveData = this.route.snapshot.data['olympicsData'];

    if (!resolveData) {
      console.log('No data found');
      this.router.navigate(['']);
      return;
    }

    // Charge les données depuis le service
    this.olympics$ = this.olympicService.getOlympics();

    //recup des données
    this.olympicService.getNumberOfJOs().subscribe((numberOfJOs) => {
      this.numberOfEntries = numberOfJOs;
    });

    this.medalsPerYear$ = this.olympicService.getMedalsPerYear(this.country);

    this.olympicService
      .getTotalMedals(this.country)
      .subscribe((totalMedals) => {
        this.numberOfMedals = totalMedals;
      });

    this.olympicService
      .getTotalAthletes(this.country)
      .subscribe((numberOfAthletes) => {
        this.numberOfAthletes = numberOfAthletes;
      });
  }
}
