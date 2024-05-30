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
export class Participation {
    public id: number;
    public year: number;
    public city: string;
    public medalsCount: number;
    public athleteCount: number;

    constructor(id: number, year: number, city: string, medalsCount: number, athleteCount: number) {
        this.id = id;
        this.year = year;
        this.city = city;
        this.medalsCount = medalsCount;
        this.athleteCount = athleteCount;
    }
}