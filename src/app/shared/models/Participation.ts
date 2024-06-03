import {Id} from "./id";

export interface Participation {
  id: Id;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}

export type Participations = Participation[];
