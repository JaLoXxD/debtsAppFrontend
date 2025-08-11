import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-update-password-view',
  templateUrl: './update-password-view.component.html',
  styleUrls: ['./update-password-view.component.scss']
})
export class UpdatePasswordViewComponent {
  constructor(private _renderer: Renderer2) {
  }

  ngOnInit(): void {
    this._renderer.addClass(document.body, 'auth-background');
  }
}
