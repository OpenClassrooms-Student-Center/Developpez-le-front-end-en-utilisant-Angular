import { Country } from "../Country";

describe('Country class', () => {
    let country = new Country({
        id: 1,
        country: 'Switzerland',
        participations: [
            {
                id: 1,
                year: 1998,
                city: 'New York',
                medalsCount: 54,
                athleteCount: 254
            },
            {
                id: 2,
                year: 2002,
                city: 'Bali',
                medalsCount: 67,
                athleteCount: 289
            }
        ]
    });

    beforeEach(() => {
        country = new Country({
            id: 1,
            country: 'Switzerland',
            participations: [
                {
                    id: 1,
                    year: 1998,
                    city: 'New York',
                    medalsCount: 54,
                    athleteCount: 254
                },
                {
                    id: 2,
                    year: 2002,
                    city: 'Bali',
                    medalsCount: 67,
                    athleteCount: 289
                }
            ]
        });
    });

    it('Should be have 2 entries', () => {
        expect(country.getNbEntries()).toBe(2);
    });

    it('Should be have 0 entries', () => {
        country.participations = []
        expect(country.getNbEntries()).toBe(0);
    });

    it('Should be have 121 medals', () => {
        expect(country.getTotalNbMedals()).toBe(121)
    });

    it('Should be have 0 medals', () => {
        country.participations = [];
        expect(country.getTotalNbMedals()).toBe(0);
    });
    
    it('Should be have 543 atheltes', () => {
        expect(country.getTotalNbOfAthletes()).toBe(543);
    });

    it('Should be have 0 atheltes', () => {
        country.participations = [];
        expect(country.getTotalNbOfAthletes()).toBe(0);
    });
});