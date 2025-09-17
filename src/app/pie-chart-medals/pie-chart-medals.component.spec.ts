import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartMedalsComponent } from './pie-chart-medals.component';

describe('PieChartMedalsComponent', () => {
  let component: PieChartMedalsComponent;
  let fixture: ComponentFixture<PieChartMedalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieChartMedalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieChartMedalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
