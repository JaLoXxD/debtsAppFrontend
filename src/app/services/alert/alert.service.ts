import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { constants } from "src/app/utils/constants";
import { AlertModel, GenericResponseModel } from "src/app/models";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  showAlert: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  alerts!: AlertModel[];
  constants: typeof constants = constants;

  constructor() {
    this._initModel();
  }

  setAlerts(alert?: AlertModel[]): void {
    this._initModel(alert);
    this.showAlert.next(alert ? true : false);
    if (this.alerts.length > 0) {
      const intervalId = setInterval(() => {
        this.alerts.shift();
        if (this.alerts.length === 0) {
          clearInterval(intervalId);
        }
      }, 4000);
    }
  }

  mapMessages(messages: string[]): AlertModel[] {
    return messages.map((msg) => {
      return {
        label: constants.ALERTS.TYPES.SUCCESS.label,
        icon: constants.ALERTS.TYPES.SUCCESS.icon,
        color: constants.ALERTS.TYPES.SUCCESS.color,
        message: msg,
      }
    });
  }

  mapErrors(response: GenericResponseModel): AlertModel[] {
    return response.errors.map((err) => {
      return {
        label: constants.ALERTS.TYPES.DANGER.label,
        icon: constants.ALERTS.TYPES.DANGER.icon,
        color: constants.ALERTS.TYPES.DANGER.color,
        message: err,
      }
    });
  }

  removeError(index: number): void {
    this.alerts.splice(index, 1);
  }

  clear(): void {
    this.alerts = [];
    this.showAlert.next(false);
  }

  private _initModel(alerts?: AlertModel[]): void {
    if (alerts) {
      this.alerts = alerts
    } else {
      this.alerts = [{
        label: '',
        icon: '',
        color: '',
      }];
    }
  }
}
