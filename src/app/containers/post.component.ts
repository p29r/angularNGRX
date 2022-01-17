import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {Repository} from '../services/repository';
import {Post} from '../models/post';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'my-post',
  template: `
    <my-post-list [postList]="postList"></my-post-list>
  `,
  styles: [``]
})

export class PostComponent implements OnInit {
  postList: Post[];
  isAlive = true;
  loading = false;
  error = false;

  constructor(private myRepository: Repository) {
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const observer$ = this.myRepository.getAllPost();
    const postData$ = observer$[1];
    const loading$ = observer$[0];
    const error$ = observer$[2];
    postData$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.postList = data;
    });
    loading$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.loading = data;
    });
    error$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.error = data;
    });
  }
}
