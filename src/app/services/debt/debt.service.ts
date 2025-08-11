import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AllDebtsModel, CreateDebtModel, CreateDebtResponseModel, DebtDetailResponseModel, DebtModel, DebtPaymentModel, DebtPaymentsResponseModel, EditDebtPaymentModel, GenericResponseModel, SingleDebtModel, TablePageModel } from "src/app/models";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  currentDebt: DebtModel | null = null;
  currentDebtPayment: DebtPaymentModel | null = null;
  isEdit: boolean = false;

  constructor(private _http: HttpClient, private _datePipe: DatePipe) { }

  getAllDebts(tablePageModel: TablePageModel):Observable<AllDebtsModel>{
    const { page, pageSize, filterValue } = tablePageModel;
    const filterCondition = filterValue ? `&filter=${filterValue}` : '';
    return this._http.get<AllDebtsModel>(`${environment.apiURL}/debt/all?page=${page}&size=${pageSize}${filterCondition}`);
  }

  getDebtById(debtId: number): Observable<SingleDebtModel>{
    return this._http.get<SingleDebtModel>(`${environment.apiURL}/debt/${debtId}`);
  }

  updateDebt(debtId: number | undefined, createDebtBody: CreateDebtModel):Observable<CreateDebtResponseModel> {
    return this._http.put<CreateDebtResponseModel>(`${environment.apiURL}/debt/${debtId}`, createDebtBody);
  }

  createDebt(createDebtBody: CreateDebtModel):Observable<CreateDebtResponseModel>{
    return this._http.post<CreateDebtResponseModel>(`${environment.apiURL}/debt`, createDebtBody);
  }

  getDebtInfo(debtId: string): Observable<DebtDetailResponseModel>{
    return this._http.get<DebtDetailResponseModel>(`${environment.apiURL}/debt/${debtId}`);
  }

  getDebtPayments(debtId: string, tablePageModel: TablePageModel): Observable<DebtPaymentsResponseModel>{
    const { page, pageSize, filterValue } = tablePageModel;
    const filterCondition = filterValue ? `&filter=${filterValue}` : '';
    return this._http.get<DebtPaymentsResponseModel>(`${environment.apiURL}/debt/payments/${debtId}?page=${page}&size=${pageSize}${filterCondition}`);
  }

  updateDebtPayment(paymentId: number, paymentBody: EditDebtPaymentModel): Observable<GenericResponseModel>{
    const formData: FormData = new FormData();
    formData.append('debtId', paymentBody.debtId!.toString());
    formData.append('name', paymentBody.name);
    formData.append('description', paymentBody.description!);
    const formattedDate = this._datePipe.transform(paymentBody.paymentDate, "yyyy-MM-dd'T'HH:mm:ss");
    formData.append('paymentDate', formattedDate!);
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
