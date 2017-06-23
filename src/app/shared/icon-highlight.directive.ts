import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[iconHighlight]'
})
export class IconHighlightDirective {
    constructor(private el: ElementRef) { }

    @HostListener('mouseenter') onMouseEnter() {
        this.el.nativeElement.classList.toggle('primary');
        this.el.nativeElement.classList.toggle('colored');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.el.nativeElement.classList.toggle('colored');
        this.el.nativeElement.classList.toggle('primary');
    }
}