// TODO: create here a typescript interface for a participation
/*
example of participation:
{
    id: 1,
    year: 2012,
    city: "Londres",
    medalsCount: 28,
    athleteCount: 372
}
*/

/**
   * We create a class Participation that will be in our main class Olympic
*/

export class Participation {
    id!: number;
    year!: number;
    city!: string;
    medalsCount!: number;
    athleteCount!: number;
}