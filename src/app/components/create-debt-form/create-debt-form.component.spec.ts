import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDebtFormComponent } from './create-debt-form.component';

describe('CreateDebtFormComponent', () => {
  let component: CreateDebtFormComponent;
  let fixture: ComponentFixture<CreateDebtFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDebtFormComponent]
    });
    fixture = TestBed.createComponent(CreateDebtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
