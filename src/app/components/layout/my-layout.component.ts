import {Component} from '@angular/core';

@Component({
  selector: 'layout',
  template: `
    <my-header></my-header>
    <router-outlet></router-outlet>
  `,
  styles: [``]
})

export class LayoutComponent {

  constructor() {
  }
}
