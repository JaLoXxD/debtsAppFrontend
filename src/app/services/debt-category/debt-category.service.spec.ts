import { TestBed } from '@angular/core/testing';

import { DebtCategoryService } from './debt-category.service';

describe('DebtCategoryService', () => {
  let service: DebtCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebtCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
