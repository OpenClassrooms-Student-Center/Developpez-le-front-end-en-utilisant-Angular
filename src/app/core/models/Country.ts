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
}
