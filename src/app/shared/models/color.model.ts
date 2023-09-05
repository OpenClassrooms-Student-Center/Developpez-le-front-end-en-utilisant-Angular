import { ScaleType } from "chart.js";

export interface Color {
    name?: string;
    selectable?: boolean;
    group?: ScaleType;
    domain: string[];
  }