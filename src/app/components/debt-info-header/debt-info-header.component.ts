import { Component } from '@angular/core';
import { DebtModel } from "src/app/models";
import { DebtService } from "src/app/services";

@Component({
  selector: 'app-debt-info-header',
  templateUrl: './debt-info-header.component.html',
  styleUrls: ['./debt-info-header.component.scss']
})
export class DebtInfoHeaderComponent {
  currentDebt: DebtModel | null = null;

  constructor(private _debtService: DebtService) {}

  ngOnInit(): void {
    this.currentDebt = this._debtService.currentDebt;
  }
}
