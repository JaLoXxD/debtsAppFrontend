import { Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { CreateDebtModel, DropdownOptionModel } from "src/app/models";
import { AlertService, DebtCategoryService, DebtPriorityService, DebtService, ModalService } from "src/app/services";
import { BaseComponent } from "src/app/shared/base/base.component";
import { constants } from "src/app/utils/constants";

@Component({
  selector: 'app-create-debt-form',
  templateUrl: './create-debt-form.component.html',
  styleUrls: ['./create-debt-form.component.scss']
})
export class CreateDebtFormComponent extends BaseComponent{
  @ViewChild('f') form: NgForm;
  isEdit: boolean = false;
  isLoading: boolean = false;
  createDebtModel: CreateDebtModel;
  debtCategoriesOptions: DropdownOptionModel[] = [];
  debtPrioritiesOptions: DropdownOptionModel[] = [];
  appConstants: typeof constants = constants;

  private _onAcceptSubscription: Subscription;

  constructor(private _debtCategoryService: DebtCategoryService, private _debtPriorityService: DebtPriorityService, private _debtService: DebtService, private _alertService: AlertService, private _router: Router, private _modalService: ModalService, private _translateService: TranslateService) {
    super();
    this._initModel();
    this._getDebtCategories();
    this._getDebtPriorities();
    console.log(this._debtService.currentDebt);
    this.isEdit = this._debtService.isEdit;
    if(this.isEdit) {
      this._mapFieldsFromDebt();
    }
  }

  ngOnInit(): void {
    this._buildSubscriptions();
  }

  ngOnDestroy(): void {
    this._onAcceptSubscription.unsubscribe();
  }

  private _buildSubscriptions(): void {
    this._onAcceptSubscription = this._modalService.acceptSubject.subscribe((resp) => {
      this._createDebt();
    });
  }

  private _mapFieldsFromDebt() {
    if(this._debtService.currentDebt === null) return;
    this.createDebtModel = {
      name: this._debtService.currentDebt.name,
      description: this._debtService.currentDebt.description,
      category: this._debtService.currentDebt.category.id,
      priority: this._debtService.currentDebt.priority.id,
      startDate: this._debtService.currentDebt.startDate,
      endDate: this._debtService.currentDebt.endDate,
      collector: this._debtService.currentDebt.collector,
      amount: this._debtService.currentDebt.amount,
      termInMonths: this._debtService.currentDebt.termInMonths,
    }
    this._debtService.currentDebt = null;
    this._debtService.isEdit = false;
  }

  private _getDebtCategories() {
    this._debtCategoryService.getAllDebtCategories().subscribe(
      (resp) => {
        console.log(resp);
        resp.allDebtCategories.forEach((category) => {
          this.debtCategoriesOptions.push({
            label: category.name,
            value: category.id
          });
        });
        console.log(this.debtCategoriesOptions)
      }
    );
  }

  private _getDebtPriorities() {
    this._debtPriorityService.getAllDebtPriorities().subscribe(
      (resp) => {
        console.log(resp);
        resp.allDebtPriorities.forEach((priority) => {
          this.debtPrioritiesOptions.push({
            label: priority.name,
            value: priority.id
          });
        });
      }
    );  
  }

  submitForm() {
    if(this.isEdit) {
      this._updateDebt();
    } else {
      this._modalService.showModal(this._translateService.instant("messages.confirmDebtCreation", {months: this.createDebtModel.termInMonths, monthlyFee: this._calcMonthlyFees()}) , this.appConstants.MODAL.ICONS.WARNING, true, true);
    }
  }

  private _calcMonthlyFees() {
    const { amount, termInMonths } = this.createDebtModel;
    if(amount && termInMonths) {
      return (amount / termInMonths).toFixed(2);
    }
    return 0;
  }

  private _createDebt() {
    this.isLoading = true;
    this._debtService.createDebt(this.createDebtModel).subscribe({
      next: (resp) => {
        this._alertService.setAlerts(this._alertService.mapMessages([resp.message]));
        this._router.navigate(['/debt/list']);
      },
      error: (err) => {
        console.log(err);
        this._alertService.setAlerts(this._alertService.mapErrors(this.setErrors(err)));
      } 
    }).add(() => {
      this.isLoading = false;
    });
  }

  private _updateDebt() {
    this.isLoading = true;
    this._debtService.updateDebt(this.createDebtModel).subscribe({
      next: (resp) => {
        this._alertService.setAlerts(this._alertService.mapMessages([resp.message]));
        this._router.navigate(['/debt/list']);
      },
      error: (err) => {
        console.log(err);
        this._alertService.setAlerts(this._alertService.mapErrors(this.setErrors(err)));
      } 
    }).add(() => {
      this.isLoading = false;
    });
  }

  updateEndDate(value: any) {
    const startDate = moment(this.createDebtModel.startDate);
    !this.createDebtModel.termInMonths && (this.createDebtModel.termInMonths = 1);
    this.createDebtModel.endDate = moment(startDate).add(this.createDebtModel.termInMonths, 'months').toDate();
  }

  private _initModel() {
    this.createDebtModel = {
      name: '',
      description: '',
      category: null,
      priority: null,
      startDate: new Date(),
      endDate: new Date(),
      collector: '',
      amount: null,
      termInMonths: null,
    }
  }
}
