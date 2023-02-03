// TODO: create here a typescript interface for an olympic country
/*
example of an olympic country:
{
    id: 1,
    country: Italy,
    participations: []
}
*/

export interface OlympicParticipationDTO {
    id: number;
    year: number;
    city: string;
    medalsCount: number;
    athleteCount: number;
}
export interface OlympicDTO {
    id: number;
    country: string;
    participations: OlympicParticipationDTO[];
}

export interface OlympicChartDatas {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
        hoverBackgroundColor: string[];
    }[]
}