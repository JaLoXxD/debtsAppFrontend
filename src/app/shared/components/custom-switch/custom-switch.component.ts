import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-switch',
  templateUrl: './custom-switch.component.html',
  styleUrls: ['./custom-switch.component.scss']
})
export class CustomSwitchComponent {
  @Input() data: any= {};
  @Input() id: string = "";
  @Input() label: string = "";
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() form: any;
  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';

  formatLabel(value: string): string {
    return this.required ? `${value}*` : value;
  }
}
