import { TestBed } from '@angular/core/testing';

import { DebtPriorityService } from './debt-priority.service';

describe('DebtPriorityService', () => {
  let service: DebtPriorityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebtPriorityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
