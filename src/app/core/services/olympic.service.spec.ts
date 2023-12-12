import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OlympicService } from './olympic.service';
import { Country } from '../models/Olympic';

/**
 * Tests for the OlympicService.
 */
fdescribe('OlympicService', () => {
  let service: OlympicService;
  let httpTestingController: HttpTestingController;

  /**
   * Set up TestBed, the test environment for the service.
   * This includes importing HttpClientTestingModule and providing OlympicService.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OlympicService]
    });
    service = TestBed.inject(OlympicService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  /**
   * After each test, ensure that there are no outstanding HTTP requests.
   */
  afterEach(() => {
    httpTestingController.verify(); 
  });

  /**
   * Test to ensure the service is created.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Test to ensure that Olympic data is correctly retrieved from the service.
   * This test simulates a GET request and verifies the response data.
   */
  it('should retrieve olympic data', () => {
    const mockOlympicData: Country[] = [
      { id: 1, country: 'Country1', participations: [] },

    ];

    service.loadInitialData().subscribe((data) => {
      expect(data).toEqual(mockOlympicData);
    });

    const req = httpTestingController.expectOne(service['olympicUrl']);
    expect(req.request.method).toEqual('GET');
    req.flush(mockOlympicData); 
  });

});
