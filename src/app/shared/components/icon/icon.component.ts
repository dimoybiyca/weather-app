import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { TIcon } from 'app/shared/types/icon.type';

@Component({
  selector: 'wa-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle],
})
export class IconComponent {
  icon: InputSignal<string | TIcon> = input.required();

  isSvgIcon(): boolean {
    const icon = this.icon();
    return typeof icon !== 'string' && icon.type === 'svg';
  }

  getIcon(): string {
    const icon = this.icon();
    return typeof icon === 'string' ? icon : icon.icon;
  }

  getColor(): string {
    const icon = this.icon();
    if (typeof icon === 'string') {
      return '';
    }

    const color = icon?.color ?? '';

    return color ? `var(${color})` : '';
  }
}
