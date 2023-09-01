import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, NgModel } from "@angular/forms";

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent {
  @ViewChild('idModel') inputModel!: NgModel;
  @Input() icon: string | null = '';
  @Input() label: string = "";
  @Input() type: string = "";
  @Input() data: any = {};
  @Input() id: string = "";
  @Input() required: boolean = false;
  @Input() form!: NgForm;

  isVisiblePassword: boolean = false;
  isPassword: boolean = false;

  ngOnInit(): void {
    this.isPassword = this.type === 'password';
  }

  isInvalidInput(): boolean {
    return this.form.submitted && this.inputModel && !this.inputModel.valid;
  }

  togglePasswordVisibility(): void {
    this.isVisiblePassword = !this.isVisiblePassword;
    this.type = this.isVisiblePassword ? 'text' : 'password';
  }
}
