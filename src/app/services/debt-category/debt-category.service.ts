import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { DebtCategoryResponseModel } from "src/app/models";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DebtCategoryService {

  constructor(private _http: HttpClient) { }

  getAllDebtCategories(): Observable<DebtCategoryResponseModel> {
    return this._http.get<DebtCategoryResponseModel>(`${environment.apiURL}/debt/category`);
  }
}
