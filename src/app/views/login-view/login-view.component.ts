import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent {
  constructor(private _renderer: Renderer2) {
  }
  
  ngOnInit(): void {
    this._renderer.addClass(document.body, 'auth-background');
  }
}
