import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { distinctUntilChanged, filter, Observable, of, Subscription } from 'rxjs';
import { OlympicChartDatas, OlympicDTO, OlympicParticipationDTO } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartService } from 'src/app/shared/chart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<OlympicDTO[]>;
  public subscription$: Subscription;
  public chartDatas: OlympicChartDatas;
  public nbJo: number;
  public nbCountries: number;
  public countries: OlympicDTO[];
  @ViewChild('chart') chart: any;


  constructor(private olympicService: OlympicService, private chartService: ChartService) {
    this.subscription$ = new Subscription();
    this.olympics$ = of([]);
    this.nbJo = 0;
    this.nbCountries = 0;
    this.chartDatas = {
      labels: [],
      datasets: []
    }
    this.countries = [];
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.subscription$ = this.olympics$.pipe(
      distinctUntilChanged(),
      filter((datas) => !!datas)
    )
      .subscribe(datas => {
        this.countries = datas;
        this.nbCountries = this.countries.length;
        this.getChartDatas();
        this.chart.refresh();
      })
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private getChartDatas() {
    let jos: OlympicParticipationDTO[] = [];
    const data: number[] = [];
    const backgroundColor: string[] = [];
    const hoverBackgroundColor: string[] = [];

    this.countries.forEach(country => {
      jos = [...jos, ...country.participations];
      this.chartDatas.labels.push(country.country);
      data.push(country.participations.map(data => data.medalsCount).reduce((prev, current) => current + prev, 0));
      backgroundColor.push(this.chartService.stringToColor(country.country));
      hoverBackgroundColor.push(this.chartService.stringToColor(country.country + country.id));
    });

    this.chartDatas.datasets.push({
      data,
      backgroundColor,
      hoverBackgroundColor,
    });
    this.nbJo = [...new Set(jos.map(jo => jo.id))].length;
  }

  public selectData($event: any) {
    const selectedCountry = this.countries[$event.element.index];
    console.log(selectedCountry);
  }
}
