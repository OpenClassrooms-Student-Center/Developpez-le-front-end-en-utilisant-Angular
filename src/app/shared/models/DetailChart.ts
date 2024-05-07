interface ParticipationChart {
  name: string;
  value: number;
}

export interface OlympicBarChart {

  country: string;
  participations: number;
  charts: ParticipationChart[];
}

export type OlympicsBarChart = OlympicBarChart[];
