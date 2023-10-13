import { MedalCountryItem } from './olympic-data.types';

export type PieChartTooltipData<TExtra = unknown> = {
  data: MedalCountryItem<TExtra>;
  endAngle: number;
  index: number;
  padAngle: number;
  pos: [number, number];
  startAngle: number;
  value: number;
};

export type SeriesData = {
  name: string;
  value: number;
};

export type CountryData = {
  name: string;
  series: SeriesData[];
};

export type LineChartData = CountryData[];
