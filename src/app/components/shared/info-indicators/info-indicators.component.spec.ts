import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoIndicatorsComponent } from './info-indicators.component';

describe('InfoIndicatorsComponent', () => {
  let component: InfoIndicatorsComponent;
  let fixture: ComponentFixture<InfoIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoIndicatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
