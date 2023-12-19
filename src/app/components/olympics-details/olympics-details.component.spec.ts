import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicsDetailsComponent } from './olympics-details.component';

describe('OlympicsDetailsComponent', () => {
  let component: OlympicsDetailsComponent;
  let fixture: ComponentFixture<OlympicsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OlympicsDetailsComponent]
    });
    fixture = TestBed.createComponent(OlympicsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
