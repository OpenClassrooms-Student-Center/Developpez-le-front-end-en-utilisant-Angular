import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartCountryComponent } from './line-chart-country.component';

describe('LineChartCountryComponent', () => {
  let component: LineChartCountryComponent;
  let fixture: ComponentFixture<LineChartCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineChartCountryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineChartCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
