import { Router } from "@angular/router";

export class BaseViewComponent {

  constructor(protected _router: Router) {}

  setCurrentRoute(): void {
    sessionStorage.setItem('currentRoute', this._router.url);
  }
}