import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export abstract class BaseComponent implements OnDestroy {
  protected $componentDestroyed = new Subject<void>();

  ngOnDestroy(): void {
    this.$componentDestroyed.next();
    this.$componentDestroyed.complete();
  }
}
