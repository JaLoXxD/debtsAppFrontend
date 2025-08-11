import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { RecoverPasswordModel } from "src/app/models";
import { AlertService, AuthService } from "src/app/services";

@Component({
  selector: 'app-recover-password-form',
  templateUrl: './recover-password-form.component.html',
  styleUrls: ['./recover-password-form.component.scss']
})
export class RecoverPasswordFormComponent {
  userInfo!: RecoverPasswordModel;
  isLoading: boolean = false;

  constructor(private _authService: AuthService, private _alertService: AlertService, private _translateService: TranslateService, private _router: Router) { 
    this._initModel();
  }

  recoverPassword(): void {
    this.isLoading = true;
    this._authService.recoverPassword(this.userInfo).subscribe({
      next: (resp) => {
        this._alertService.setAlerts(this._alertService.mapMessages([this._translateService.instant("recoverPassword.success", { email: resp.email })]));
        this._router.navigate(['/auth/login']);
      },
      error: (err) => {
        this._alertService.setAlerts(this._alertService.mapErrors(err.error));
      },
    }).add(() => {
      this.isLoading = false;
    });
  }
  
  back(): void {
    this._router.navigate(['/auth/login']);
  }

  private _initModel(): void {
    this.userInfo = {
      userId: '',
    }
  }
}
