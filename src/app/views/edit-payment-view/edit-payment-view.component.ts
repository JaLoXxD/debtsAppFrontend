import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit-payment-view',
  templateUrl: './edit-payment-view.component.html',
  styleUrls: ['./edit-payment-view.component.scss']
})
export class EditPaymentViewComponent {
  constructor(private _router: Router) {}

  back() {
    this._router.navigate(['/debt/detail']);
  }
}
