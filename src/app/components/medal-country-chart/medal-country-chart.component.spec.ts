import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalCountryChartComponent } from './medal-country-chart.component';

describe('MedalCountryChartComponent', () => {
  let component: MedalCountryChartComponent;
  let fixture: ComponentFixture<MedalCountryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedalCountryChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedalCountryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
