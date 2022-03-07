import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export abstract class BaseSubscribeComponent implements OnInit, OnDestroy {
  private _subScription = new Subscription();

  ngOnInit(): void {
    this.onInit();
  }

  ngOnDestroy(): void {
    this.onDestroy();
    this._subScription.unsubscribe();
  }

  addSubscription(sub: Subscription) {
    this._subScription.add(sub);
  }

  protected onInit() {}
  protected onDestroy() {}
}
