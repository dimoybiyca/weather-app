import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  InputSignal,
} from '@angular/core';
import { interval, map, startWith, takeWhile } from 'rxjs';

@Directive({
  selector: '[waNumberAnimation]',
  standalone: true,
})
export class NumberAnimationDirective {
  targetNumber: InputSignal<number> = input<number>(0);
  duration: InputSignal<number> = input<number>(3000);
  startNumber: InputSignal<number> = input<number>(0);

  currentNumber: number = this.startNumber();

  private el: ElementRef = inject(ElementRef);
  private readonly interval: number = 50;

  constructor() {
    this.updateNumberDisplay();

    effect(() => {
      const newValue = this.targetNumber();
      if (newValue !== this.currentNumber) {
        this.animateNumberChange();
      }
    });
  }

  private animateNumberChange(): void {
    const difference = this.targetNumber() - this.currentNumber;
    const steps = this.duration() / this.interval;
    const step = difference / steps;

    interval(this.interval)
      .pipe(
        startWith(0),
        map((_, index) => this.currentNumber + step * index),
        takeWhile(
          (val) =>
            this.targetNumber() > this.currentNumber
              ? val < this.targetNumber()
              : val > this.targetNumber(),
          true,
        ),
      )
      .subscribe({
        next: (newValue) => {
          this.currentNumber = newValue;
          this.updateNumberDisplay();
        },
        complete: () => {
          this.currentNumber = this.targetNumber();
          this.updateNumberDisplay();
        },
      });
  }

  private updateNumberDisplay(): void {
    this.el.nativeElement.innerText = this.currentNumber.toFixed(0);
  }
}
