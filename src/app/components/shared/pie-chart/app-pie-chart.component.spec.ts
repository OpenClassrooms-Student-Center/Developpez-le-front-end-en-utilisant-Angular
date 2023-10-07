import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPieChartComponent } from './app-pie-chart.component';

describe('AppPieChartComponent', () => {
  let component: AppPieChartComponent;
  let fixture: ComponentFixture<AppPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
