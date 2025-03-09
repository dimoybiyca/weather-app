import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wa-logo',
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {}
