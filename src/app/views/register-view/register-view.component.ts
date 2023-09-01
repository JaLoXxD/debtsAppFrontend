import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss']
})
export class RegisterViewComponent {
  constructor(private _renderer: Renderer2) {
  }
  
  ngOnInit(): void {
    this._renderer.addClass(document.body, 'auth-background');
  }
}
