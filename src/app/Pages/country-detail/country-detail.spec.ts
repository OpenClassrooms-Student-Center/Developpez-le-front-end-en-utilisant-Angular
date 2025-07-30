import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDetail } from './country-detail';

describe('CountryDetail', () => {
  let component: CountryDetail;
  let fixture: ComponentFixture<CountryDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
