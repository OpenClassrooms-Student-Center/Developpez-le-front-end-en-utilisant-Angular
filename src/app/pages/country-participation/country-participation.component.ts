import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country-participation',
  templateUrl: './country-participation.component.html',
  styleUrls: ['./country-participation.component.scss']
})
export class CountryParticipationComponent implements OnInit {
  private olympicSubscribe! : Subscription;

  public olympic! : Olympic;

  constructor(
    private olympicService: OlympicService,
    private route : ActivatedRoute,
    private router : Router
    ) {}

  ngOnInit(): void {
    let id : number = +this.route.snapshot.params['id'];
    this.olympic = this.olympicService.getOlympic(id);
  }

  goBack(): void {
    this.router.navigateByUrl('');
  }

}
