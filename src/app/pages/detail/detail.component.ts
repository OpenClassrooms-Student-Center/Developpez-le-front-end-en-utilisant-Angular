import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  country!: string;
  pageTitle!: string;

  info1 = 'Number of entries';
  numberOfEntries!: number;
  info2 = 'Total number medals';
  numberOfMedals!: number;
  info3 = 'Total number of athletes';
  numberOfAthletes!: number;

  public olympics$: Observable<Olympic[]> = of([]);

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.country = this.route.snapshot.paramMap.get('country')!;
    this.pageTitle = this.country;

    //recup des données
    this.olympicService.getNumberOfJOs().subscribe((numberOfJOs) => {
      this.numberOfEntries = numberOfJOs;
    });

    this.olympicService
      .getTotalMedals(this.country)
      .subscribe((totalMedals) => {
        this.numberOfMedals = totalMedals;
      });

    this.olympicService
    .getTotalAthletes(this.country)
    .subscribe((numberOfAthletes) => {
      this.numberOfAthletes = numberOfAthletes;
    })
  }
}
