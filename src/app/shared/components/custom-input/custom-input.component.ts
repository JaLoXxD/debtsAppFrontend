import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
  @Input() dynamicLabel: boolean = false;
  @Input() form!: NgForm;
  @Input() maxAmount: number | undefined = undefined;
  @Input() disabled: boolean = false;

  @Output() blurEmmiter: EventEmitter<any> = new EventEmitter();

  isVisiblePassword: boolean = false;
  isPassword: boolean = false;

  ngOnInit(): void {
    this.isPassword = this.type === 'password';
    if(this.type === 'currency' && !this.maxAmount) {
      this.maxAmount = this.data[this.id];
    }
  }

  isInvalidInput(): boolean {
    return this.form.submitted && this.inputModel && !this.inputModel.valid;
  }

  onBlur(event: any) {
    if (this.type === 'currency') {
      this.formatCurrency();
    }
    this.blurEmmiter.emit(event);
  }

  formatCurrency(): void {
    const value = parseFloat(this.data[this.id]);
    if (!isNaN(value)) {
      this.data[this.id] = value.toFixed(2);
    }
  }

  togglePasswordVisibility(): void {
    this.isVisiblePassword = !this.isVisiblePassword;
    this.type = this.isVisiblePassword ? 'text' : 'password';
  }

  addCurrencySign() {
    let value = this.data[this.id];
  
    // Remove all non-digit characters (except the first character if it's a $)
    value = value.replace(/(?!^\$)\D/g, '');
    console.log(value)
  
    // If the first character is not a $, add it
    if (!value.startsWith('$')) {
      value = '$' + value;
    }
    console.log(value)
    this.data[this.id] = value;
    console.log(this.data)
  }

  formatInputAsCurrency(id: string) {
    let value = this.data[id];

    // Remove all non-digit characters (except decimal point)
    value = value.replace(/[^0-9.]/g, '');

    // Format as currency
    value = parseFloat(value).toFixed(2);

    this.data[id] = value;
  }

  preventE(event: KeyboardEvent) {
    if (event.key === 'e' || event.key === 'E') {
      event.preventDefault();
    }
  }
}
