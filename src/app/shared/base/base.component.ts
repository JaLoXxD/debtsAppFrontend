import { Component, Input } from '@angular/core';
import { GenericResponseModel, TableDataModel } from "src/app/models";

@Component({
  template: ''
})
export class BaseComponent {
  @Input() title!: string;
  @Input() subtitle!: string;

  setErrors(err: any): GenericResponseModel {
    return err.error ? err.error : err as GenericResponseModel;
  }

  initTableData(): TableDataModel {
    return {
      items: [],
      columns: [],
      totalElements: 0,
      totalPages: 0,
    }
  }
}