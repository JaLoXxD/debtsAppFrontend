import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { DebtService } from "src/app/services";
import { BaseViewComponent } from "src/app/shared/base/base-view.component";

@Component({
  selector: 'app-create-debt-view',
  templateUrl: './create-debt-view.component.html',
  styleUrls: ['./create-debt-view.component.scss']
})
export class CreateDebtViewComponent extends BaseViewComponent{
  constructor(protected override _router: Router, private _debtService: DebtService) {
    super(_router);
  }

  get isEdit(): boolean {
    return this._debtService.isEdit;
  }
}
