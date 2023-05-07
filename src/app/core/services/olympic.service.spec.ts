import { TestBed } from '@angular/core/testing';

import { OlympicService } from './olympic.service';
import { HttpClientModule } from '@angular/common/http';

describe('OlympicService', () => {
  let service: OlympicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    });
    service = TestBed.inject(OlympicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
