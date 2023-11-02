import { TestBed } from '@angular/core/testing';

import { OlympicService } from './olympic.service';
import { Observable } from 'rxjs';
import { Countries, Country } from '../../models/Country';

describe('OlympicService', () => {
  let service: OlympicService;
  let countries$ : Observable<Countries>
  let countries : Countries = [];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlympicService);
    countries$ = service.loadInitialData();
    countries$.subscribe({
      next: (value) => {countries = value}
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be get 5 country', () => {
    expect(service.getNumberOfCountry(countries)).toBe(5);
  });

  it('should be get 3 JOs', () => {
    expect(service.getNumberOfJOs(countries)).toBe(3);
  });

  it('should be get 0 country', () => {
    countries = [];
    expect(service.getNumberOfCountry(countries)).toBe(5);
  });

  it('should be get 0 JOs', () => {
    countries = [];
    expect(service.getNumberOfJOs(countries)).toBe(3);
  });

  describe('Country methods', () => {
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
        expect(service.getNbEntries(country)).toBe(2);
    });

    it('Should be have 0 entries', () => {
        country.participations = []
        expect(service.getNbEntries(country)).toBe(0);
    });

    it('Should be have 121 medals', () => {
        expect(service.getTotalNbMedals(country)).toBe(121)
    });

    it('Should be have 0 medals', () => {
        country.participations = [];
        expect(service.getTotalNbMedals(country)).toBe(0);
    });
    
    it('Should be have 543 atheltes', () => {
        expect(service.getTotalNbOfAthletes(country)).toBe(543);
    });

    it('Should be have 0 atheltes', () => {
        country.participations = [];
        expect(service.getTotalNbOfAthletes(country)).toBe(0);
    });
});

});
