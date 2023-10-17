export class Participations {
  id!: number;
  years!: number;
  city!: string;
  medalsCount!: number;
  athleteCount!: number;
}

export class OlympicData {
  id!: number;
  country!: string;
  participations!: Participations[];
}
