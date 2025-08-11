import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() btnType: string = "common";
  @Input() disabled: boolean | null = false;
  @Output() onClick = new EventEmitter();

  clickBtn() {
    this.onClick.emit();
  }
}
