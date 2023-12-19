import { Component, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartData } from 'src/app/core/models/ChartData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  chartdata: ChartData[] = [];

  totalOlympicGames: number = 0;
  totalCountries: number = 0;
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe((olympics) => {
      const value = this.olympicService.processOlympicGamesAndCountry(olympics);
      this.totalOlympicGames = value.totalOlympicGames;
      this.totalCountries = value.totalCountries; 
    });
  }
}
