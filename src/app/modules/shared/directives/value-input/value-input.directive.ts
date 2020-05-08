import { Directive, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[svrValueInput]'
})
export class ValueInputDirective implements AfterViewInit {

  private prevValue: string;

  constructor(private readonly elementRef: ElementRef<HTMLInputElement>) {
  }

  @HostListener('keypress', ['$event'])
  validateBeforeInput(event: KeyboardEvent) {
    const pattern = /^-|[0-9]|\.$/;

    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  inputCange(event: any) {
    const pattern = /^-?[0-9]*\.?([0-9]{1,2})?$/;
    const newValue = this.elementRef.nativeElement.value;
    if (pattern.test(newValue)) {
      this.prevValue = newValue;
    } else {
      this.elementRef.nativeElement.value = this.prevValue;
    }

  }

  ngAfterViewInit(): void {
    this.prevValue = this.elementRef.nativeElement.value;
  }
}
