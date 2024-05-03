import {Id} from "./id";
import {Participations} from "./Participation";

export interface Olympic {
  id: Id;
  country: string;
  participation: Participations;
}

export type Olympics = Olympic[];
