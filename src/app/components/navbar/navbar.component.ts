import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private _authService: AuthService, private _router: Router){}

  logout(): void {
    this._authService.logout();
  }

  reload() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
  }
}
