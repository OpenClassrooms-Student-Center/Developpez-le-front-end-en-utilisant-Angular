import { TestBed } from '@angular/core/testing';

import { IdExistsGuard } from './id-exists.guard';

describe('IdExistsGuard', () => {
  let guard: IdExistsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IdExistsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
