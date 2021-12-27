import { TestBed } from '@angular/core/testing';

import { ActivatedUserService } from './activated-user.service';

describe('ActivatedUserService', () => {
  let service: ActivatedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivatedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
