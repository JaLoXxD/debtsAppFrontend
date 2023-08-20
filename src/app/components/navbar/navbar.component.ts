import { Component } from '@angular/core';
import { AuthService } from "src/app/services";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private _authService: AuthService){}

  logout(): void {
    this._authService.logout();
  }
}
