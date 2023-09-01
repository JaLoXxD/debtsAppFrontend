import { Component, Input } from '@angular/core';
import { GenericResponseModel } from "src/app/models";

@Component({
  template: ''
})
export class BaseComponent {
  @Input() title!: string;
  @Input() subtitle!: string;

  setErrors(err: any): GenericResponseModel {
    return err.error ? err.error : err as GenericResponseModel;
  }
}