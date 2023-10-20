import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss']
})
export class PageDetailComponent implements OnInit {

  olympics$: Observable<Olympic> | undefined;

  constructor(
    private olympicService: OlympicService, private route: ActivatedRoute)  {
    }

  ngOnInit(): void {
    const countryName = this.route.snapshot.paramMap.get('country');
    //this.olympicService.getOlympicByName(countryName);
  }

}
