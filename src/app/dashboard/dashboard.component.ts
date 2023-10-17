import {Component, OnInit} from '@angular/core';
import {OlympicData} from "../models/olympic-data.model";
import {DataService} from "../services/olympic-data.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  olympicData!: OlympicData[]
  public nbJO!: number;
  public nbCountry!: number;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((data: OlympicData[]) => {
      this.olympicData = data;
    });
  }
}
