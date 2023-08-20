import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent {
  @Input() isLoading: boolean = false;
  @Input() label: string = "";
  @Input() centered: boolean = false;
  @Input() type: string = "button";
}
