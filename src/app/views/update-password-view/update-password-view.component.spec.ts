import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordViewComponent } from './update-password-view.component';

describe('UpdatePasswordViewComponent', () => {
  let component: UpdatePasswordViewComponent;
  let fixture: ComponentFixture<UpdatePasswordViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePasswordViewComponent]
    });
    fixture = TestBed.createComponent(UpdatePasswordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
