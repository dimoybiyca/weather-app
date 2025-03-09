import { trigger, transition, style, animate } from '@angular/animations';

export const expandCollapse = trigger('expandCollapse', [
  transition(':enter', [
    style({ maxHeight: '0px', opacity: 0 }),
    animate('300ms linear', style({ maxHeight: '{{maxHeight}}', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ maxHeight: '{{maxHeight}}', opacity: 1 }),
    animate('200ms linear', style({ maxHeight: '0', opacity: 0 })),
  ]),
]);
