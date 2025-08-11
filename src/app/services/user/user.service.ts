import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GenericResponseModel, UpdatePasswordModel, UserModel, UserResponseModel } from "src/app/models";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userInfo: UserModel;

  constructor(private _http: HttpClient) {}

  updatePassword(updatePasswordBody: UpdatePasswordModel): Observable<GenericResponseModel> {
    return this._http.put<GenericResponseModel>(`${environment.apiURL}/user/update-password`, updatePasswordBody);
  }

  getUserInfo(): Observable<UserResponseModel> {
    return this._http.get<UserResponseModel>(`${environment.apiURL}/user`);
  }
}
