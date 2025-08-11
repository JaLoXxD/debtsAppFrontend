import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { DebtPriorityResponseModel } from "src/app/models";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DebtPriorityService {

  constructor(private _http: HttpClient) { }

  getAllDebtPriorities(): Observable<DebtPriorityResponseModel> {
    return this._http.get<DebtPriorityResponseModel>(`${environment.apiURL}/debt/priority`);
  }
}
