// TODO: create here a typescript interface for an olympic country
/*
example of an olympic country:
{
    id: 1,
    country: Italy,
    participations: []
}
*/

interface OlympicParticipationDTO {
    id: number;
    year: number;
    city: string;
    medalsCount: number;
    athleteCount: number;
}
export default interface OlympicDTO {
    id: number;
    country: string;
    participations: OlympicParticipationDTO[];
}