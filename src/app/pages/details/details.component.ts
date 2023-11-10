import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/core/models/Header';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  paramId!: number;
  header!: Header;
  nameCountry!: string;
  totalMedals!: number;
  totalAthletes!: number;
  totalParticipations!: number;

  subscription: Subscription[] = [];

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramId = Number(this.route.snapshot.params['id']);
    this.InitData();
    this.header = {
      title: this.nameCountry,
      indicator: [
        {
          description: 'Number of entries',
          value: this.totalParticipations,
        },
        { description: 'Total number medals', value: this.totalMedals },
        {
          description: 'Total number of athletes',
          value: this.totalAthletes,
        },
      ],
    };
  }
  private InitData(): void {
    this.subscription.push(
      this.olympicService.getOlympicById(this.paramId).subscribe((result) => {
        console.log(result);
        if (result) {
          this.nameCountry = result.country;
          this.totalParticipations = result.participations.length;
        }
      })
    );
    this.subscription.push(
      this.olympicService
        .getMedalsById(this.paramId)
        .subscribe((totalMedals) => {
          if (totalMedals) this.totalMedals = totalMedals;
        })
    );
    this.subscription.push(
      this.olympicService
        .getAthletesById(this.paramId)
        .subscribe((totalAthlete) => {
          if (totalAthlete) this.totalAthletes = totalAthlete;
        })
    );
  }
}
