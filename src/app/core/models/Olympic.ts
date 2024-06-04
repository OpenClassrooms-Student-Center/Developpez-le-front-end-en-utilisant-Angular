// TODO: create here a typescript interface for an olympic country

export interface Participations {
    id: number,
    year: number,
    city: string,
    medalsCount: number,
    athleteCount: number
}

export interface Country {
    id: number,
    country: string,
    participations: Participations[]
}
