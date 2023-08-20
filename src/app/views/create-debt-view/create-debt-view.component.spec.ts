import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDebtViewComponent } from './create-debt-view.component';

describe('CreateDebtViewComponent', () => {
  let component: CreateDebtViewComponent;
  let fixture: ComponentFixture<CreateDebtViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDebtViewComponent]
    });
    fixture = TestBed.createComponent(CreateDebtViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
