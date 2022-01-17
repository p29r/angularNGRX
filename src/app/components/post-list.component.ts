import {Component, Input} from '@angular/core';
import {Post} from '../models/post';

@Component({
  selector: 'my-post-list',
  template: `
    <my-post-card *ngFor="let post of postList" [post]="post"></my-post-card>
  `,
  styles: [``]
})

export class PostListComponent {
  @Input() postList: Post[];

  constructor() {
  }
}
