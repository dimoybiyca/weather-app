import { Component } from '@angular/core';
import { MainComponent } from 'app/main/index/main.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [MainComponent],
})
export class AppComponent {}
