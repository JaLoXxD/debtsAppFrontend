import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCloseModal]'
})
export class CloseModalDirective {
  @Output() toggleModal = new EventEmitter();

  constructor(private _el: ElementRef, private _renderer: Renderer2) {
  }  

  @HostListener('click', ['$event']) onClick($event: Event){
    const target = $event.target as Element;
    const exludedTags:Array<String> = ["button", "span"]
    if(target.classList.contains('modal-container')){
      this._renderer.removeClass(this._el.nativeElement, 'show')
      this._renderer.addClass(this._el.nativeElement, 'hide')
      this.toggleModal.next(false);
    }else if(!target.classList.contains('modal-container') && !exludedTags.includes(target.tagName.toLowerCase())){
      this.toggleModal.next(true);
    }
  }
}
