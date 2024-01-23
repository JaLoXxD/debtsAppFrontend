import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { EditDebtPaymentModel, ImageFileModel } from "src/app/models";
import { AlertService, DebtService, ModalService } from "src/app/services";
import { BaseComponent } from "src/app/shared/base/base.component";

@Component({
  selector: 'app-edit-payment-form',
  templateUrl: './edit-payment-form.component.html',
  styleUrls: ['./edit-payment-form.component.scss']
})
export class EditPaymentFormComponent extends BaseComponent {
  @ViewChild('f') form: NgForm;
  isLoading: boolean = false;
  editDebtPaymentModel: EditDebtPaymentModel;
  imageModel: ImageFileModel;
  previewUrl: string | ArrayBuffer;


  private _debtPaymentId: number = 0;

  constructor(private _debtService: DebtService, private _modalService: ModalService, private _alertService: AlertService, private route: ActivatedRoute) {
    super();
    this._initModel();
    this.route.paramMap.subscribe(params => {
      this._debtPaymentId = Number(params.get('id'));
    });
  }

  submitForm() {
    this._payDebt();
  }

  private _payDebt() {
    this.editDebtPaymentModel.payed = true;
    this.isLoading = true;
    this._debtService.updateDebtPayment(this._debtPaymentId, this.editDebtPaymentModel).subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
        this._alertService.setAlerts(this._alertService.mapErrors(this.setErrors(err)));
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onFileSelected(isImgSelected: boolean) {
    console.log(isImgSelected)
    if (!isImgSelected) {
      this.editDebtPaymentModel.image = null;
      return;
    }
    let file: File | null = this.editDebtPaymentModel.image; 
    if (file) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.editDebtPaymentModel.image = file;
        this.imageModel.src = e.target.result;
        this.imageModel.title = file?.name || '';
        console.log(this.imageModel)
      }  
      reader.readAsDataURL(file);
    }
  }
  
  showImagePreviewModal(show: boolean) {
    if (!show) return;
    this._modalService.showImagePreviewModal(this.imageModel.title || '', null, this.imageModel, false, false);
  }

  private _initModel() {
    this.editDebtPaymentModel = {
      debtId: this._debtService.currentDebt?.id || null,
      name: this._debtService.currentDebtPayment?.name || '',
      description: this._debtService.currentDebtPayment?.description || '',
      paymentDate: this._debtService.currentDebtPayment?.paymentDate || new Date(),
      amount: this._debtService.currentDebtPayment?.amount || null,
      pendingAmount: this._debtService.currentDebt?.pendingAmount || null,
      image: this._debtService.currentDebtPayment?.image || null,
      payed: this._debtService.currentDebtPayment?.payed || false,
    }

    this.imageModel = {
      src: '',
      title: '',
    }
  }
}
