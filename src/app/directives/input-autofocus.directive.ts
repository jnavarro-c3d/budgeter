import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appInputAutofocus]'
})
export class InputAutofocusDirective implements OnInit {

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
    this._elementRef.nativeElement.focus();
  }
}
