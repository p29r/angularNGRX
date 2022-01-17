import {Component, Input} from '@angular/core';
import {User} from '../models/user';

@Component({
  selector: 'my-user-list',
  template: `
    <div fxLayout="row wrap" fxLayoutAlign="center start" fxLayoutGap="30px">
      <my-user-card [user]="user" *ngFor="let user of users"></my-user-card>
    </div>
  `,
  styles: [``]
})

export class UserListComponent {
  @Input() users: User[];

  constructor() {
  }
}
