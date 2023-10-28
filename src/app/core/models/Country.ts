import { DtrParticipation, Participation } from "./Participation";

// Dtr = Data received
export type DtrCountry = ICountry | undefined | null;

export type Countries = Array<DtrCountry>;

interface ICountry {
    id : number,
    country : string,
    participations : Array<DtrParticipation>
};

export class Country {

    id : number;
    country : string;
    participations : Array<Participation>;

    constructor(
        $country : DtrCountry
    ) {
        this.id = $country!.id;
        this.country = $country!.country;
        this.participations = $country!.participations.map((value : DtrParticipation) => new Participation(value));
    }

    /**
     * Get number of entries
     * @returns 
     */
    public getNbEntries() : number {
        return this.participations.length;
    }

    /**
     * Get total number of medals won
     * @returns number
     */
    public getTotalNbMedals() : number {
        if (this.participations.length === 0) return 0
        return this.participations.map((participation) => participation.medalsCount).reduce((a,b) => a+b);
    }

    /**
     * Get total number of athletes who participated
     * @returns number
     */
    public getTotalNbOfAthletes() : number {
        if (this.participations.length === 0) return 0
        return this.participations.map((participation) => participation.athleteCount).reduce((a,b) => a+b);
    }
}
