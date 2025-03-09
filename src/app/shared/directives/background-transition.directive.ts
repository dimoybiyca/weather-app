import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  InputSignal,
  Renderer2,
} from '@angular/core';
import { TWeatherData } from 'app/main/types/weather-data.type';

@Directive({
  selector: '[waBackgroundTransition]',
  standalone: true,
})
export class BackgroundTransitionDirective {
  duration: InputSignal<number> = input(2000);
  weatherData: InputSignal<TWeatherData | null> = input.required();

  private currentTime: string = '';
  private currentCondition: string = '';
  private el: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  constructor() {
    effect(() => {
      const data = this.weatherData();
      if (!data) {
        return;
      }

      this.updateBackground();
    });
  }

  private updateBackground(): void {
    const timeStyle = this.getTimeStyle();
    const conditionStyle = this.getConditionStyle();

    if (
      timeStyle === this.currentTime &&
      conditionStyle === this.currentCondition
    ) {
      return;
    }

    this.currentTime = timeStyle;
    this.currentCondition = conditionStyle;

    const currentLayer =
      this.el.nativeElement.querySelector('.background-layer');
    this.pushNextLayer();
    this.removePreviousLayer(currentLayer);
  }

  private removePreviousLayer(currentLayer: ElementRef): void {
    if (currentLayer) {
      setTimeout(() => {
        this.renderer.removeChild(this.el.nativeElement, currentLayer);
      }, this.duration());
    }
  }

  private pushNextLayer(): void {
    const nextLayer = this.renderer.createElement('div');

    this.renderer.addClass(nextLayer, 'background-layer');
    this.renderer.addClass(nextLayer, this.currentTime);
    this.renderer.addClass(nextLayer, this.currentCondition);
    this.renderer.appendChild(this.el.nativeElement, nextLayer);
  }

  private getConditionStyle(): string {
    return this.weatherData()?.condition.toLowerCase() ?? 'default';
  }

  private getTimeStyle(): string {
    const hours = this.weatherData()?.date.getUTCHours();

    if (!hours) {
      return 'default';
    }

    if (hours >= 5 && hours < 12) {
      return 'morning';
    } else if (hours >= 12 && hours < 17) {
      return 'day';
    } else if (hours >= 17 && hours < 21) {
      return 'evening';
    } else {
      return 'night';
    }
  }
}
