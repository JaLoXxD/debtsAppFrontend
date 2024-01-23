import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFileUploaderComponent } from './custom-file-uploader.component';

describe('CustomFileUploaderComponent', () => {
  let component: CustomFileUploaderComponent;
  let fixture: ComponentFixture<CustomFileUploaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomFileUploaderComponent]
    });
    fixture = TestBed.createComponent(CustomFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
