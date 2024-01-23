import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AllDebtsModel, CreateDebtModel, CreateDebtResponseModel, DebtDetailResponseModel, DebtModel, DebtPaymentsResponseModel, EditDebtPaymentModel, GenericResponseModel } from "src/app/models";
import { DebtPaymentModel } from "src/app/models/debt-payment/debtPayment.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  currentDebt: DebtModel | null = null;
  currentDebtPayment: DebtPaymentModel | null = null;
  isEdit: boolean = false;

  constructor(private _http: HttpClient) { }

  getAllDebts(page: number, size: number, filterValue: string | null):Observable<AllDebtsModel>{
    const filterCondition = filterValue ? `&filter=${filterValue}` : '';
    return this._http.get<AllDebtsModel>(`${environment.apiURL}/debt/all?page=${page}&size=${size}${filterCondition}`);
  }

  updateDebt(createDebtBody: CreateDebtModel):Observable<CreateDebtResponseModel> {
    return this._http.put<CreateDebtResponseModel>(`${environment.apiURL}/debt`, createDebtBody);
  }

  createDebt(createDebtBody: CreateDebtModel):Observable<CreateDebtResponseModel>{
    return this._http.post<CreateDebtResponseModel>(`${environment.apiURL}/debt`, createDebtBody);
  }

  getDebtInfo(debtId: string): Observable<DebtDetailResponseModel>{
    return this._http.get<DebtDetailResponseModel>(`${environment.apiURL}/debt/${debtId}`);
  }

  getDebtPayments(debtId: string, page: number, size: number, filterValue: string | null): Observable<DebtPaymentsResponseModel>{
    const filterCondition = filterValue ? `&filter=${filterValue}` : '';
    return this._http.get<DebtPaymentsResponseModel>(`${environment.apiURL}/debt/payments/${debtId}?page=${page}&size=${size}${filterCondition}`);
  }

  updateDebtPayment(paymentId: number, paymentBody: EditDebtPaymentModel): Observable<GenericResponseModel>{
    const formData: FormData = new FormData();
    formData.append('debtId', paymentBody.debtId!.toString());
    formData.append('name', paymentBody.name);
    formData.append('description', paymentBody.description!);
    formData.append('paymentDate', paymentBody.paymentDate!.toString());
    formData.append('amount', paymentBody.amount!.toString());
    formData.append('pendingAmount', paymentBody.pendingAmount!.toString());
    formData.append('image', paymentBody.image!);
    formData.append('payed', paymentBody.payed!.toString());
    return this._http.put<GenericResponseModel>(`${environment.apiURL}/debt/payment/${paymentId}`, formData);
  }

  deleteDebt(debtId: string): Observable<GenericResponseModel>{
    return this._http.delete<GenericResponseModel>(`${environment.apiURL}/debt/${debtId}`);
  }
}
