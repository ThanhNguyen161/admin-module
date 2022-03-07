import { ElementRef } from "@angular/core";

export const focusElement  = (element: ElementRef<HTMLElement>) => {
    if(!element || !element.nativeElement) return;
    element.nativeElement.scrollIntoView({
        behavior: 'smooth'
    });
    
}