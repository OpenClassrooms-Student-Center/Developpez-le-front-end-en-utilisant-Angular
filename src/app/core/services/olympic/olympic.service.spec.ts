import { TestBed } from '@angular/core/testing';

import { OlympicService } from './olympic.service';
import { Observable } from 'rxjs';
import { Countries } from '../../models/Country';

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
});
