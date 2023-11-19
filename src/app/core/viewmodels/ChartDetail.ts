import { OlympicMedalsCount } from "./OlympicMedalsCount";

// This model is used to insert data into the line chart that contains data with 'name' and 'series' as properties.
// series is a set of values that each one contains a name and a value properties.
export interface ChartDetail {
  name: string;
  series: OlympicMedalsCount[];
}
