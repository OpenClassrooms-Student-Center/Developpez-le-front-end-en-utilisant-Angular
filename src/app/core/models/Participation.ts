export type DtrParticipation = IParticipation;

interface IParticipation {
    id : number,
    year : number,
    city : string,
    medalsCount: number,
    athleteCount: number
};

export class Participation {
    
    id : number;
    year : number;
    city : string;
    medalsCount: number;
    athleteCount: number;

    constructor(
        $participation : IParticipation
    ) {
        this.id = $participation.id;
        this.year = $participation.year;
        this.city = $participation.city;
        this.medalsCount = $participation.medalsCount;
        this.athleteCount = $participation.athleteCount;
    }   
}
