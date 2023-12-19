import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomChartComponent } from './custom-chart.component';

describe('CustomChartComponent', () => {
  let component: CustomChartComponent;
  let fixture: ComponentFixture<CustomChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
