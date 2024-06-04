import { Participations } from "./Participation";


export interface Country {
    id: number,
    country: string,
    participations: Participations[]
}
