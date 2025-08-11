import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtsViewComponent } from './debts-view.component';

describe('DebtsViewComponent', () => {
  let component: DebtsViewComponent;
  let fixture: ComponentFixture<DebtsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebtsViewComponent]
    });
    fixture = TestBed.createComponent(DebtsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
