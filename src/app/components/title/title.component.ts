import { Component, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  chartData = {
    title: 'Medals per Country',
  }
  constructor(private olympicService: OlympicService) { }

  ngOnInit(): void {

  }
}
