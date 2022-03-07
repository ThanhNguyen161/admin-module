import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userSelectors } from 'src/app/domain';

@Component({
  selector: 'app-loading',
  templateUrl: './page-loading.component.html',
  styleUrls: ['./page-loading.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate(
          '0.3s ease-in-out',
          style({
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '0.3s ease-in-out',
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class PageLoadingComponent implements OnInit {
  showLoading: Observable<boolean>;
  constructor(private store: Store) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getAppLoading();
  }

  getAppLoading() {
      this.showLoading = this.store.select(userSelectors.getLoading())
  }
}
