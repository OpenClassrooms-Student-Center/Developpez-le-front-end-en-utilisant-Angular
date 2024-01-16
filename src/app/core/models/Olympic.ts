import { Participation } from './Participation';
// TODO: create here a typescript interface for an olympic country
/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/

export class Olympic {
  constructor(
    public id: number,
    public country: string,
    public participations: Participation[]
  ) {}
}
