import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtsListComponent } from './debts-list.component';

describe('DebtsListComponent', () => {
  let component: DebtsListComponent;
  let fixture: ComponentFixture<DebtsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebtsListComponent]
    });
    fixture = TestBed.createComponent(DebtsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
