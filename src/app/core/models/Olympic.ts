import { IParticipation } from "./Participation";

export type Olympic = IOlympic | undefined | null;

export type Olympics = Array<Olympic> | undefined | null;

interface IOlympic {
    id : number,
    country : string,
    participations : Array<IParticipation>
};
