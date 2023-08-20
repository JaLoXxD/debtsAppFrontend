import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPasswordFormComponent } from './recover-password-form.component';

describe('RecoverPasswordFormComponent', () => {
  let component: RecoverPasswordFormComponent;
  let fixture: ComponentFixture<RecoverPasswordFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecoverPasswordFormComponent]
    });
    fixture = TestBed.createComponent(RecoverPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
