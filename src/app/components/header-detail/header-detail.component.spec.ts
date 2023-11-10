import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDetailComponent } from './header-detail.component';

describe('HeaderDetailComponent', () => {
  let component: HeaderDetailComponent;
  let fixture: ComponentFixture<HeaderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
