import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { NgForm, NgModel } from "@angular/forms";
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
  value: any = '';

  filteredOptions: DropdownOptionModel[] = [];

  constructor(private _cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.filteredOptions = this.options;
    console.log(this.filteredOptions);
    this._cdr.detectChanges();
  }

  ngOnChanges(): void {
    if(this.data[this.id]) {
        this.setValue();
    }
  }

  filterOptions(event: any) {
    const { query } = event;
    this.filteredOptions = this.options.filter(option => option.label.toLowerCase().includes(query.toLowerCase()));
  }

  setValue() {
    this.value = this.filteredOptions.filter(option => option.value === this.data[this.id])[0].label;
  }

  isInvalidInput(): boolean {
    return this.form.submitted && this.inputModel && !this.inputModel.valid;
  }

  onSelect(event: any) {
    this.data[this.id] = event.value.value;
    console.log(this.data);
    this.setValue();
  }
}
