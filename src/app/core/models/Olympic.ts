
import { Participation } from "./Participation";

export class Olympic {
    public id?: number;
    public country?: string;
    public participations?: Participation[];

    constructor(id: number, country: string, participations: Participation[]) {
        this.id = id;
        this.country = country;
        this.participations = participations;
    }
}