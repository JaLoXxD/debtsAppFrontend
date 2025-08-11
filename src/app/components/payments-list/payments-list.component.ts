import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { DebtModel, TableButtonModel, TableDataModel, TablePageModel } from "src/app/models";
import { DebtPaymentModel } from "src/app/models/debt-payment/debtPayment.model";
import { DebtService } from "src/app/services";
import { BaseComponent } from "src/app/shared/base/base.component";

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss']
})
export class PaymentsListComponent extends BaseComponent {
  isLoading: boolean = false;
  currentDebt: DebtModel | null = null;
  tableData: TableDataModel;
  tableButtons: TableButtonModel[] = [];

  constructor(private _debtService: DebtService, private _router: Router) {
    super();
  }

  ngOnInit() {
    this.tableData = this.initTableData();
    this.currentDebt = this._debtService.currentDebt;
    this._getDebtPayments({ page: 0, pageSize: 10, filterValue: '' });
    this._initColumns();
  }

  private _initColumns(): void {
    this.tableData.columns = [
      { label: 'id', type: 'string' },
      { label: 'name', type: 'string' },
      { label: 'description', type: 'string' },
      { label: 'payed', type: 'checkbox', disabled: true },
      { label: 'paymentDate', type: 'date' },
      { label: 'maxPaymentDate', type: 'date' },
      { label: 'balanceBeforePay', type: 'currency' },
      { label: 'balanceAfterPay', type: 'currency' },
      { label: 'amount', type: 'currency' },
    ];
    this.tableButtons = [
      { icon: 'fa-solid fa-pen', action: 'edit', color: 'primary', label: 'buttons.edit' },
    ];
  }

  edit(debtPayment: DebtPaymentModel) {
    this._debtService.currentDebtPayment = debtPayment;
    this._router.navigate(['debt/payment', debtPayment.id]);  
  }

  onGetDebtPayments(tablePageModel: TablePageModel) {
    this._getDebtPayments(tablePageModel);
  }

  private _getDebtPayments(tablePageModel: TablePageModel) {
    this.isLoading = true;
    const { id } = this.currentDebt!;
    this._debtService.getDebtPayments(id.toString(), tablePageModel).subscribe({
      next: (resp) => {
        this.tableData = {
          ...this.tableData,
          items: resp.debtPayments ? resp.debtPayments: [],
          totalElements: resp.totalElements ? resp.totalElements: 0,
          totalPages: resp.totalPages ? resp.totalPages: 0,
        }
        return;
      },
      error: (err) => {
        this.tableData = {
          ...this.tableData,
          items: [],
          totalElements: 0,
          totalPages: 0,
        }
        console.log(err);
      },
    }).add(() => {
      this.isLoading = false;
    });  
  }

  // getCurrentPage(pageInfo: TablePageModel) {
  //   this._getDebtPayments(pageInfo.page, pageInfo.pageSize);
  // }

  // filter(pageInfo: TablePageModel) {
  //   const { page, pageSize, filterValue } = pageInfo;
  //   this._getDebtPayments(page, pageSize, filterValue);
  // }
}
