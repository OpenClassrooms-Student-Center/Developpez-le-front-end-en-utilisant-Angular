import { Participation } from "./Participation";

export interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}

/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
