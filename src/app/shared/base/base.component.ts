import { Component, Input } from '@angular/core';
import { GenericResponseModel, TableDataModel } from "src/app/models";
import { constants } from "src/app/utils/constants";

@Component({
  template: ''
})
export class BaseComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  appConstants: typeof constants = constants;

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