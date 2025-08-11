import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentFormComponent } from './edit-payment-form.component';

describe('EditPaymentFormComponent', () => {
  let component: EditPaymentFormComponent;
  let fixture: ComponentFixture<EditPaymentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPaymentFormComponent]
    });
    fixture = TestBed.createComponent(EditPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
