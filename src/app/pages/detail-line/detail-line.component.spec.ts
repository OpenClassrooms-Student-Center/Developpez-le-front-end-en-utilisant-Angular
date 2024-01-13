import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLineComponent } from './detail-line.component';

describe('DetailLineComponent', () => {
  let component: DetailLineComponent;
  let fixture: ComponentFixture<DetailLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
