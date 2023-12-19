import {ChartData} from "./ChartData";

export class DetailsChartData {

  public name !: string;
  public series !: ChartData[];

  constructor(name : string) {
    this.name = name;
    this.series = [];
  }

  public addSerie (data : ChartData) : void {
    this.series.push(data);
  }

}
