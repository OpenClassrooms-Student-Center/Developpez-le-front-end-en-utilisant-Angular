import { IParticipation } from "./Participation";

export type Olympic = IOlympic | undefined | null;

interface IOlympic {
    id : number,
    country : string,
    participations : Array<IParticipation>
};
