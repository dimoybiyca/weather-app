import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  InputSignal,
  OnInit,
  output,
  OutputEmitterRef,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { expandCollapse } from 'animation/expand-collapse.animation';
import { BaseControlValueAccessor } from 'app/core/base/control-value-accessor';
import { IconComponent } from 'app/shared/components/icon/icon.component';
import { ClickOutsideDirective } from 'app/shared/directives/click-outside.directive';
import { TOption } from 'app/shared/types/option.type';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'wa-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [expandCollapse],
  imports: [ReactiveFormsModule, IconComponent, NgClass, ClickOutsideDirective],
})
export class AutocompleteComponent
  extends BaseControlValueAccessor<TOption<any>>
  implements OnInit
{
  placeholder: InputSignal<string> = input('Search...');
  options: InputSignal<TOption<any>[]> = input<TOption<any>[]>([]);
  delay: InputSignal<number> = input(500);

  searchChange: OutputEmitterRef<string | null> = output<string | null>();

  isDropdownOpen: WritableSignal<boolean> = signal(false);
  activeIndex: WritableSignal<number> = signal(0);
  searchFormControl = new FormControl<string>('');
  lastTerm: string = '';

  get maxHeight(): string {
    const numItems = this.options().length;
    return `${numItems * 4}rem`;
  }

  constructor() {
    super();

    effect(() => {
      const length = this.options().length;

      this.isDropdownOpen.set(length > 0);
    });
  }

  ngOnInit(): void {
    this.searchFormControl.valueChanges
      .pipe(
        takeUntil(this.$componentDestroyed),
        debounceTime(this.delay()),
        distinctUntilChanged(),
      )
      .subscribe((value) => {
        this.searchChange.emit(value ?? null);
      });
  }

  selectOption(option: TOption<any>): void {
    this.formControl.setValue(option);
    this.searchFormControl.setValue(option.title, { emitEvent: false });
    this.isDropdownOpen.set(false);
  }

  toggleDropdown(): void {
    if (this.isDropdownOpen()) {
      this.onBlur();
    } else {
      this.onFocus();
    }
  }

  onBlur(): void {
    this.isDropdownOpen.set(false);
    this.activeIndex.set(0);

    const currentOption = this.formControl.value;
    if (!currentOption?.title) {
      this.lastTerm = this.searchFormControl.value ?? '';
      this.searchFormControl.setValue('', { emitEvent: false });
    }
  }

  onFocus(): void {
    if (this.options().length > 0) {
      this.isDropdownOpen.set(true);
    }

    if (this.lastTerm && !this.formControl.value?.title) {
      this.searchFormControl.setValue(this.lastTerm, { emitEvent: false });
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    const currentIndex = this.activeIndex() ?? -1;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.set(
          Math.min(currentIndex + 1, this.options().length - 1),
        );
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.set(Math.max(currentIndex - 1, 0));
        break;

      case 'Enter':
        event.preventDefault();
        if (this.activeIndex() !== null && this.options()[this.activeIndex()]) {
          this.selectOption(this.options()[this.activeIndex()]);
        }
        break;

      case 'Escape':
        this.isDropdownOpen.set(false);
        break;
    }
  }
}
