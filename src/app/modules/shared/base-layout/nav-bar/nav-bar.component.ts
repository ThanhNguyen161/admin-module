import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { APP_ROLE, NavigationBarModel } from 'src/app/domain';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [
    trigger('collapsedExpanded', [
      // ...
      state(
        'expanded',
        style({
          // width: '150px',
          'min-width': '150px',
        })
      ),
      state(
        'collapsed',
        style({
          width: '0',
        })
      ),
      transition('expanded => collapsed', [animate('0.3s')]),
      transition('collapsed => expanded', [animate('0.3s')]),
    ]),
  ],
})
export class NavBarComponent {
  @ViewChild('sideNav') sideNav: ElementRef;
  @Input('is-nav-collapsed') collapsed = true;
  @Output('is-nav-collapsedChange') collapsedChange =
    new EventEmitter<boolean>();

  closeNav() {
    this.collapsedChange.emit(true);
  }

  menuList = [
    new NavigationBarModel('Home', '/home', true),
    new NavigationBarModel('Admin', '/admin', false, [
      APP_ROLE.ADMIN,
      APP_ROLE.MODERATOR,
    ]),
  ];
}
