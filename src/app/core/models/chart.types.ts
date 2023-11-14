import { MedalCountryItem } from './olympic-data.types';

/**
 * Data structure representing the tooltip information for a pie chart.
 */
export type PieChartTooltipData<TExtra = unknown> = {
  /**
   * The data associated with the tooltip.
   */
  data: MedalCountryItem<TExtra>;
  /**
   * The end angle of the pie chart segment.
   */
  endAngle: number;
  /**
   * The index of the data point.
   */
  index: number;
  /**
   * The pad angle of the pie chart segment.
   */
  padAngle: number;
  /**
   * The position of the tooltip in the format [x, y].
   */
  pos: [number, number];
  /**
   * The start angle of the pie chart segment.
   */
  startAngle: number;
  /**
   * The numerical value associated with the data point.
   */
  value: number;
};

/**
 * Data structure representing a series for a line chart.
 */
export type SeriesData = {
  /**
   * The name of the series.
   */
  name: string;
  /**
   * The numerical value of the series.
   */
  value: number;
  /**
   * Additional information associated with the series.
   */
  extra: { athleteCount: number };
};

/**
 * Data structure representing the chart data for a country in a line chart.
 */
export type CountryData = {
  /**
   * The name of the country.
   */
  name: string;
  /**
   * An array of series data representing the chart data for the country.
   */
  series: SeriesData[];
};

/**
 * Data structure representing line chart data for multiple countries.
 */
export type LineChartData = CountryData[];
