import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { RegisterModel } from "src/app/models";
import { AlertService, AuthService } from "src/app/services";
import { BaseComponent } from "src/app/shared/base/base.component";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent extends BaseComponent{
  isLoading: boolean = false;
  registerModel!: RegisterModel;

  constructor(private _authService: AuthService, private _alertService: AlertService, private _router: Router){
    super();
    this._initModel();
  }

  createUser() {
    this._authService.register(this.registerModel).subscribe({
      next: (resp) => {
        this._alertService.setAlerts(this._alertService.mapMessages([resp.message]));
        this._router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.log(err);
        this._alertService.setAlerts(this._alertService.mapErrors(this.setErrors(err)));
      },
    }).add(() => {
      this.isLoading = false;
    });
  }

  back(): void {
    this._router.navigate(['/auth/login']);
  }

  private _initModel(): void {
    this.registerModel = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      secondName: '',
      secondLastName: '',
      email: '',
      phone: '',
      salary: null,
    };
  }
}
