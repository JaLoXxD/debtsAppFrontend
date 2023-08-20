import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent {
  @Input() icon: string | null = null;
  @Input() label: string = "";
  @Input() type: string = "";
  @Input() data: any = {};
  @Input() id: string = "";

  isVisiblePassword: boolean = false;
  isPassword: boolean = false;

  ngOnInit(): void {
    this.isPassword = this.type === 'password';
  }

  togglePasswordVisibility(): void {
    this.isVisiblePassword = !this.isVisiblePassword;
    this.type = this.isVisiblePassword ? 'text' : 'password';
  }
}
