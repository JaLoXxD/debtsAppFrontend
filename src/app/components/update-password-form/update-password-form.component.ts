import { Component } from '@angular/core';
import { UpdatePasswordModel } from "src/app/models";
import { AlertService, AuthService, UserService } from "src/app/services";
import { BaseComponent } from "src/app/shared/base/base.component";

@Component({
  selector: 'app-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.scss']
})
export class UpdatePasswordFormComponent extends BaseComponent{
  isLoading: boolean = false;
  updatePasswordModel: UpdatePasswordModel;

  constructor(private _userService: UserService, private _alertService: AlertService, private _authService: AuthService) {
    super();
    this._initModel();
  }

  updatePassword(): void {
    this.isLoading = true;
    this._userService.updatePassword(this.updatePasswordModel).subscribe({
      next: (resp) => {
        this._alertService.setAlerts(this._alertService.mapMessages([resp.message]));
        this._authService.logout();
      },
      error: (err) => {
        this._alertService.setAlerts(this._alertService.mapErrors(this.setErrors(err)));
      }
    }).add(() => {
      this.isLoading = false;
    });
  }

  private _initModel(): void {
    this.updatePasswordModel = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  }
}
