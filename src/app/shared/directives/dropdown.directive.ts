import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.active') class = false;

  constructor(private _elRef: ElementRef) {}

  @HostListener('document:click', ['$event']) clickBtn(eventData: Event) {
      if (!this._elRef.nativeElement.contains(eventData.target)) {
          this.class = false;
      } else {
          this.class = !this.class;
      }
  }
}
