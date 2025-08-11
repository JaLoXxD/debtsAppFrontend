import { CurrencyPipe, DatePipe } from "@angular/common";
import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { EditDebtPaymentModel, ImageFileModel } from "src/app/models";
import { AlertService, DebtService, ModalService } from "src/app/services";
import { BaseComponent } from "src/app/shared/base/base.component";
import { environment } from "src/environments/environment";

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
  maxAmount: number | undefined = undefined;

  private _debtPaymentId: number = 0;
  private _onAcceptSubscription: Subscription;

  constructor(
    private _debtService: DebtService, 
    private _modalService: ModalService, 
    private _alertService: AlertService, 
    private route: ActivatedRoute, 
    private _router: Router, 
    private _translateService: TranslateService, 
    private _currencyPipe: CurrencyPipe,
    private _datePipe: DatePipe
) {
    super();
    this._initModel();
    this.route.paramMap.subscribe(params => {
      this._debtPaymentId = Number(params.get('id'));
    });
  }

  ngOnInit(): void {
    this._buildSubscriptions();
  }

  submitForm() {
    this._payDebt();
  }

  private _buildSubscriptions(): void {
    this._onAcceptSubscription = this._modalService.acceptSubject.subscribe((resp) => {
      this._updateDebtPayment();
    });
  }

  private _getCurrentDebt() {
    this._debtService.getDebtById(this._debtService.currentDebt?.id!).subscribe({
      next: (resp) => {
        if(resp.success) {
          this._debtService.currentDebt = resp.debt;
        }
      },
      error: (err) => {
        console.log(err);
        this._alertService.setAlerts(this._alertService.mapErrors(this.setErrors(err)));
      }
    });
  }

  private _payDebt() {
    this.editDebtPaymentModel.payed = true;
    this.isLoading = true;
    console.log(this._debtService.currentDebtPayment);
    if(this._debtService.currentDebtPayment?.expectedAmount !== this.editDebtPaymentModel.amount) {
      this._modalService.showModal(this._translateService.instant('messages.confirmDebtPaymentsUpdate', {amount: this._currencyPipe.transform(this.editDebtPaymentModel.amount, 'USD')}), this.appConstants.MODAL.ICONS.WARNING);
      return;
    }
    this._updateDebtPayment();
  }

  private _updateDebtPayment() {
    this._debtService.updateDebtPayment(this._debtPaymentId, this.editDebtPaymentModel).subscribe({
      next: (resp) => {
        console.log(resp);
        if(resp.success) {
          this._alertService.setAlerts(this._alertService.mapMessages([resp.message]));
          this._router.navigate(['/debt/detail']);
          this._debtService.currentDebt && this._getCurrentDebt();
        }
      },
      error: (err) => {
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
    if(!this.imageModel.src) {
      this.imageModel.src = `${environment.uploadsURL}/${this.editDebtPaymentModel.image}`;
      this.imageModel.title = this.editDebtPaymentModel.image?.toString() || '';
    }
    this._modalService.showImagePreviewModal(this.imageModel.title || '', null, this.imageModel, false, false);
  }

  async createFileFromURL(url: string, filename: string): Promise<File> {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], filename, { type: data.type });
  }

  private _initModel() {
    let imageFile = null;

    this.editDebtPaymentModel = {
      debtId: this._debtService.currentDebt?.id || null,
      name: this._debtService.currentDebtPayment?.name || '',
      description: this._debtService.currentDebtPayment?.description || '',
      paymentDate: this._debtService?.currentDebtPayment?.paymentDate ? new Date(this._debtService?.currentDebtPayment?.paymentDate) : new Date(),
      amount: this._debtService.currentDebtPayment?.expectedAmount || null,
      pendingAmount: this._debtService.currentDebt?.pendingAmount || null,
      image: imageFile,
      payed: this._debtService.currentDebtPayment?.payed || false,
    }

    this.maxAmount = this._debtService.currentDebt?.pendingAmount || undefined;

    if(this._debtService.currentDebtPayment?.image) {
      this.createFileFromURL(`${environment.uploadsURL}/${this._debtService.currentDebtPayment?.image}`, this._debtService.currentDebtPayment?.image || '').then((file) => {
        console.log(this._debtService.currentDebtPayment);
        console.log(file);
        imageFile = file;
        this.editDebtPaymentModel.image = imageFile; 
        this.imageModel = {
          src: this._debtService.currentDebtPayment?.image ? `${environment.uploadsURL}/${this._debtService.currentDebtPayment?.image}` : '',
          title: this._debtService.currentDebtPayment?.image || '',
        }
    
        console.log(this.editDebtPaymentModel);
      });
    }

    this.imageModel = {
      src: this._debtService.currentDebtPayment?.image ? `${environment.uploadsURL}/${this._debtService.currentDebtPayment?.image}` : '',
      title: this._debtService.currentDebtPayment?.image || '',
    }
    console.log(this.editDebtPaymentModel);
  }

  get currentDebtPayment() {
    return this._debtService.currentDebtPayment;
  }

  ngOnDestroy(): void {
    this._onAcceptSubscription.unsubscribe();
  }
}
