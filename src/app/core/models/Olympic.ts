import {Participation} from "./Participation";

export class Olympic {
  constructor(
    public id: number,
    public country: string,
    public participations: Participation[],
  ) {}
}
