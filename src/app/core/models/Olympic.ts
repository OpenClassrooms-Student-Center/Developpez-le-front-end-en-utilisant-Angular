import { DtrParticipation, Participation } from "./Participation";

export type DtrOlympic = IOlympic | undefined | null;

export type Olympics = Array<DtrOlympic> | undefined | null;

interface IOlympic {
    id : number,
    country : string,
    participations : Array<DtrParticipation>
};

export class Olympic {

    id : number;
    country : string;
    participations : Array<Participation>;

    constructor(
        $olympic : DtrOlympic
    ) {
        this.id = $olympic!.id;
        this.country = $olympic!.country;
        this.participations = $olympic!.participations.map((value : DtrParticipation) => new Participation(value));
    }


}
