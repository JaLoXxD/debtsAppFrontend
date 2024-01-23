import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm, NgModel } from "@angular/forms";

@Component({
  selector: 'app-custom-date-picker',
  templateUrl: './custom-date-picker.component.html',
  styleUrls: ['./custom-date-picker.component.scss']
})
export class CustomDatePickerComponent {
  @ViewChild('idModel') inputModel!: NgModel;
  @Input() icon: string | null = '';
  @Input() label: string = "";
  @Input() data: any = {};
  @Input() id: string = "";
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() dynamicLabel: boolean = false;
  @Input() form!: NgForm;

  @Output() dateChangeEmmiter: EventEmitter<any> = new EventEmitter();

  isInvalidInput(): boolean {
    return this.form.submitted && this.inputModel && !this.inputModel.valid;
  }

  onDateChange(event: any) {
    this.dateChangeEmmiter.emit(event);
  }
}
