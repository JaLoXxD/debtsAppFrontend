import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { LoginModel, LoginResponseModel } from "src/app/models";
import { AlertService, AuthService } from "src/app/services";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  userInfo!: LoginModel;
  isVisiblePassword: boolean = false;
  isLoading: boolean = false;

  constructor(private _authService: AuthService, private _alertService: AlertService, private _router: Router) {
    this._initModel();
  }

  togglePasswordVisibility(): void {
    this.isVisiblePassword = !this.isVisiblePassword;
  }

  login(): void {
    this.isLoading = true;
    this._authService.login(this.userInfo).subscribe({
      next: (resp) => {
        console.log('Login success');
        console.log(resp);
        this._router.navigate(['/']);
        this._setLocalStorageValues(resp);
      },
      error: (err) => {
        console.log('Login failed');
        this._alertService.setAlerts(this._alertService.mapErrors(err.error));
      },
    }).add(() => {
      this.isLoading = false;
    });
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
