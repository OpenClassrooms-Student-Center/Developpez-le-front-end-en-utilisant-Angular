import { Participation } from "./participation.model";

/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
export interface OlympicCountry {
    id: number;
    country: string;
    participations: Participation[]
}