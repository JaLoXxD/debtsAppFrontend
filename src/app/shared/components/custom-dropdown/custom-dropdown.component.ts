import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, NgModel, FormControl } from "@angular/forms";
import { takeUntil } from "rxjs";
import { DropdownOptionModel } from "src/app/models";

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent {
  @ViewChild('idModel') inputModel!: NgModel;
  @Input() icon: string | null = '';
  @Input() label: string = "";
  @Input() data: any = {};
  @Input() id: string = "";
  @Input() required: boolean = false;
  @Input() dynamicLabel: boolean = false;
  @Input() form!: NgForm;
  @Input() options: DropdownOptionModel[];

  optionFilter: FormControl = new FormControl();
  filteredOptions: DropdownOptionModel[] = [];
  
  ngOnInit(): void {
    this.filteredOptions = this.options;
    this.optionFilter.valueChanges
      .subscribe(() => {
        this.filteredOptions = this.options.filter(option => option.label.toLowerCase().includes(this.optionFilter.value.toLowerCase()));
        console.log(this.filteredOptions);
      });
  }

  isInvalidInput(): boolean {
    return this.form.submitted && this.inputModel && !this.inputModel.valid;
  }
}
