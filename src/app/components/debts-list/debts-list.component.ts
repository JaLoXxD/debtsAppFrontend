import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { DebtDtoModel, DebtModel, TableButtonModel, TableDataModel, TablePageModel } from "src/app/models";
import { AlertService, DebtService, ModalService } from "src/app/services";
import { BaseComponent } from "src/app/shared/base/base.component";
import { constants } from "src/app/utils/constants";

@Component({
  selector: 'app-debts-list',
  templateUrl: './debts-list.component.html',
  styleUrls: ['./debts-list.component.scss']
})
export class DebtsListComponent extends BaseComponent {
  debts: DebtModel[] = [];
  debtsDto: DebtDtoModel[] = [];
  tableData: TableDataModel;
  tableButtons: TableButtonModel[] = [];
  currentPage: number = 1;

  private _onAcceptSubscription: Subscription;
  private _selectedDebt: DebtDtoModel | null = null;

  constructor(private _debtService: DebtService, private _modalService: ModalService, private _alertService: AlertService, private _router: Router) {
    super();
    this.tableData = this.initTableData();
  }

  ngOnInit(): void {
    this._getAllDebts();
    this._buildSubscriptions();
    this._initColumns();
  }

  ngOnDestroy(): void {
    this._onAcceptSubscription.unsubscribe();
  }

  private _initColumns(): void {
    this.tableData.columns = [
      { label: 'id', type: 'string' },
      { label: 'name', type: 'string' },
      { label: 'description', type: 'string' },
      { label: 'category', type: 'string' },
      { label: 'priority', type: 'string' },
      { label: 'startDate', type: 'date' },
      { label: 'endDate', type: 'date' },
      { label: 'collector', type: 'string' },
      { label: 'amount', type: 'currency' },
      { label: 'termInMonths', type: 'string' },
    ];
    this.tableButtons = [
      { icon: 'fa-solid fa-pen', action: 'edit', color: 'primary', label: 'buttons.edit' },
      { icon: 'fa-solid fa-list', action: 'showPayments', color: 'primary', label: 'buttons.payments' },
      { icon: 'fa-solid fa-x', action: 'delete', color: 'warn', label: 'buttons.delete' },
    ];
  }

  private _buildSubscriptions(): void {
    this._onAcceptSubscription = this._modalService.acceptSubject.subscribe((resp) => {
      const { id } = this._selectedDebt!;
      this._deleteDebt(id);
    });
  }

  private _getAllDebts(page: number = 0, size: number = 10, filterValue: string | null = null): void {
    this._debtService.getAllDebts(page, size, filterValue).subscribe((resp) => {
      if (resp.debts.length === 0) {
        this.debtsDto = [];
        this.tableData = {
          ...this.tableData,
          items: this.debtsDto,
        }
        return;
      }
      this.debts = resp.debts;
      this.debtsDto = resp.debts.map((debt) => {
        if (this.tableData.columns.length === 0) {
          this._initColumns();
        }
        return {
          ...debt,
          category: debt.category.description,
          priority: debt.priority.description,
        };
      });
      this.tableData = {
        ...this.tableData,
        items: this.debtsDto,
        totalElements: resp.totalElements,
        totalPages: resp.totalPages,
      };
    });
  }

  private _deleteDebt(debtId: number): void {
    this._debtService.deleteDebt(debtId.toString()).subscribe((resp) => {
      if (resp.success) {
        this._alertService.setAlerts(this._alertService.mapMessages([resp.message]));
      }
      this._getAllDebts();
    }
    );
  }

  getCurrentPage(pageInfo: TablePageModel) {
    this._getAllDebts(pageInfo.page, pageInfo.pageSize);
  }

  filter(pageInfo: TablePageModel) {
    const { page, pageSize, filterValue } = pageInfo;
    this._getAllDebts(page, pageSize, filterValue);
  }

  edit(debt: DebtDtoModel) { 
    this._debtService.currentDebt = this.debts.find((d) => d.id === debt.id)!;
    this._debtService.isEdit = true;
    this._router.navigate([`/debt/create`]);
  }

  showPayments(debt: DebtDtoModel) {
    this._debtService.currentDebt = this.debts.find((d) => d.id === debt.id)!;
    this._router.navigate([`/debt/detail`]);
  }

  delete(debt: DebtDtoModel) {
    this._selectedDebt = debt;
    this._modalService.showModal("messages.confirmDelete", this.appConstants.MODAL.ICONS.WARNING);
  }
}
