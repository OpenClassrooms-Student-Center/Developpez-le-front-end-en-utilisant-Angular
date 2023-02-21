import { Participation } from "./Participation";
/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
export interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}


