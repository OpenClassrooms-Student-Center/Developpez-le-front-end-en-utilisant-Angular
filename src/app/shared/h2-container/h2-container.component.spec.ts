import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H2ContainerComponent } from './h2-container.component';

describe('H2ContainerComponent', () => {
  let component: H2ContainerComponent;
  let fixture: ComponentFixture<H2ContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ H2ContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(H2ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
