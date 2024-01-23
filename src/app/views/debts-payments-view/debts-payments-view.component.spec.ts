import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtsPaymentsViewComponent } from './debts-payments-view.component';

describe('DebtsPaymentsViewComponent', () => {
  let component: DebtsPaymentsViewComponent;
  let fixture: ComponentFixture<DebtsPaymentsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebtsPaymentsViewComponent]
    });
    fixture = TestBed.createComponent(DebtsPaymentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
