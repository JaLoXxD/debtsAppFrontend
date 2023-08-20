import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-recover-password-view',
  templateUrl: './recover-password-view.component.html',
  styleUrls: ['./recover-password-view.component.scss']
})
export class RecoverPasswordViewComponent {
  constructor(private _renderer: Renderer2) {
  }
  
  ngOnInit(): void {
    this._renderer.addClass(document.body, 'auth-background');
  }
}
