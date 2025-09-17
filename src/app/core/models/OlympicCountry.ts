// TODO: create here a typescript interface for an olympic country
/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/

import { Participation } from './Participation';

export class OlympicCountry {
  constructor(
    public id: string,
    public countryName: string,
    public participations: Participation[]
  ) {}

  getTotalMedals(): number {
    let totalMedals: number = 0;
    for (let participation of this.participations) {
      totalMedals += participation.medalsCount;
    }
    return totalMedals;
  }

  getTotalAthletes(): number {
    let totalAthletes: number = 0;
    for (let participation of this.participations) {
      totalAthletes += participation.athleteCount;
    }
    return totalAthletes;
  }
}