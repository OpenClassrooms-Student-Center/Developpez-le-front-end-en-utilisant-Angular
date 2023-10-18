export class Participations {
  id!: number;
  year!: number;
  city!: string;
  medalsCount!: number;
  athleteCount!: number;
}

export class OlympicData {
  id!: number;
  country!: string;
  participations!: Participations[];
}
