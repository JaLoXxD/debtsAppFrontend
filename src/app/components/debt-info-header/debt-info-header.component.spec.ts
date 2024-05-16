import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtInfoHeaderComponent } from './debt-info-header.component';

describe('DebtInfoHeaderComponent', () => {
  let component: DebtInfoHeaderComponent;
  let fixture: ComponentFixture<DebtInfoHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebtInfoHeaderComponent]
    });
    fixture = TestBed.createComponent(DebtInfoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
