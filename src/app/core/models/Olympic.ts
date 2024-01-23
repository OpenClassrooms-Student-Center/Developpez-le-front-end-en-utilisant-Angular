import { Participation } from "./Participation";

export interface Olympics { 
    id?: number;
    country?: string;
    participations?: Array<Participation>;
}
