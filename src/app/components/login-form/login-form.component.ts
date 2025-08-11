import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginModel, LoginResponseModel } from "src/app/models";
import { AlertService, AuthService, UserService } from "src/app/services";
import { BaseComponent } from "src/app/shared/base/base.component";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends BaseComponent{
  @ViewChild('f') loginForm!: NgForm;

  userInfo!: LoginModel;
  isVisiblePassword: boolean = false;
  isLoading: boolean = false;

  constructor(private _authService: AuthService, private _alertService: AlertService, private _userService: UserService, private _router: Router) {
    super();
    this._initModel();
  }

  togglePasswordVisibility(): void {
    this.isVisiblePassword = !this.isVisiblePassword;
  }

  login(): void {
    this.isLoading = true;
    this._authService.login(this.userInfo).subscribe({
      next: (resp) => {
        this._setLocalStorageValues(resp);
        this._getUserInfo();
      },
      error: (err) => {
        this._alertService.setAlerts(this._alertService.mapErrors(this.setErrors(err)));
      },
    }).add(() => {
      this.isLoading = false;
    });
  }

  private _getUserInfo(): void {
    this._userService.getUserInfo().subscribe(
      (resp) => {
        this._userService.userInfo = resp.user;
        let  redirectUrl = "/";
        if(resp.user.resetPassword) {
          redirectUrl = "/update-password";
        }
        this._router.navigate([redirectUrl]);
      }
    );
  }

  private _setLocalStorageValues(loginResp: LoginResponseModel): void {
    sessionStorage.setItem('token', loginResp.token!);
    sessionStorage.setItem('username', this.userInfo.username);
  }

  private _initModel(): void {
    this.userInfo = {
      username: '',
      password: ''
    }
  }
}
