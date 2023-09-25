import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryParticipationComponent } from './country-participation.component';

describe('CountryParticipationComponent', () => {
  let component: CountryParticipationComponent;
  let fixture: ComponentFixture<CountryParticipationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryParticipationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
