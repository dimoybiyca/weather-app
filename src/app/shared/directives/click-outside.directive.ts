import {
  Directive,
  ElementRef,
  HostListener,
  output,
  OutputEmitterRef,
} from '@angular/core';

@Directive({
  selector: '[waClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  clickOutside: OutputEmitterRef<void> = output();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    const isClickedInside =
      this.elementRef.nativeElement.contains(targetElement);
    if (!isClickedInside) {
      this.clickOutside.emit();
    }
  }
}
