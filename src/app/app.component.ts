import { Component } from '@angular/core';
import { AuthService, TranslationService, UserService } from "./services";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'debts-app';

  constructor(private _translateService: TranslationService, private _authService: AuthService, private _userService: UserService, private _router: Router) {
  }

  ngOnInit(): void {
    this._translateService.loadDefaultLang();
    this._authService.loadToken();
    if(this._authService.getToken() != "" && !this._userService.userInfo) {
      this._getUserInfo();
    }
  }

  private _getUserInfo(): void {
    this._userService.getUserInfo().subscribe(
      (resp) => {
        this._userService.userInfo = resp.user;
        let  redirectUrl = "/";
        if(resp.user.resetPassword) {
          redirectUrl = "/update-password";
        }
        this._router.navigate([redirectUrl]);
      }
    );
  }

  isLoggedIn(): boolean {
    return this._authService.isLoggedIn();
  }
}
