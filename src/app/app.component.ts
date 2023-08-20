import { Component } from '@angular/core';
import { AuthService, TranslationService } from "./services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'debts-app';

  constructor(private _translateService: TranslationService, private _authService: AuthService) {
  }

  ngOnInit(): void {
    this._translateService.loadDefaultLang();
    this._authService.loadToken();
  }

  isLoggedIn(): boolean {
    return this._authService.isLoggedIn();
  }
}
