import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { LoginModel, LoginResponseModel, RecoverPasswordModel, RecoverPasswordResponseModel, RegisterModel } from "src/app/models";
import { UserResponseModel } from "src/app/models/user/userResponse.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string = "";
  public redirectUrl: string = "";

  constructor(private _http: HttpClient, private _router: Router) {}

  register(userInfo: RegisterModel): Observable<UserResponseModel> {
    return this._http.post<UserResponseModel>(`${environment.apiAuthURL}/register`, userInfo);
  }

  login(userInfo: LoginModel): Observable<LoginResponseModel> {
    return this._http.post<LoginResponseModel>(`${environment.apiAuthURL}/login`, userInfo);
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.token = "";
    this._router.navigate(["/auth/login"]);
  }

  recoverPassword(userInfo: RecoverPasswordModel): Observable<RecoverPasswordResponseModel> {
    return this._http.post<RecoverPasswordResponseModel>(`${environment.apiAuthURL}/recover-password`, userInfo);
  }

  isLoggedIn(): boolean {
    return this.token !== "" || sessionStorage.getItem('token') !== null;
  }

  loadToken(): void {
    this.token = sessionStorage.getItem('token') ? sessionStorage.getItem('token')! : "";
    if(this.token != "") {
      this._router.navigate(["/"]);
    }
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }
}
