import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticCardListComponent } from './statistic-card-list.component';

describe('StatisticCardListComponent', () => {
  let component: StatisticCardListComponent;
  let fixture: ComponentFixture<StatisticCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
