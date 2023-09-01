import { trigger, transition, style, animate } from '@angular/animations';
import { Component, HostBinding } from '@angular/core';
import { constants } from "src/app/utils/constants";
import { AlertModel } from "src/app/models";
import { AlertService } from "src/app/services";

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss'],
  animations: [
    trigger('alertAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('0.3s ease-out', style({ transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ]),
    ])
  ]
})
export class CustomAlertComponent {
  @HostBinding('@alertAnimation') alertAnimation = true;
  constants: typeof constants = constants;
  alerts!: AlertModel[];
  showAlerts: boolean = false;

  constructor(private _alertService: AlertService) {}

  ngOnInit(): void {
    this._alertService.showAlert.subscribe((showAlert) => {
      if (showAlert) {
        this.showAlerts = showAlert;
        this.alerts = this._alertService.alerts;
      }
    });
  }

  removeError(index: number): void {
    this._alertService.removeError(index);
  }
}
