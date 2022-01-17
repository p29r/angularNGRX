import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Repository} from '../services/repository';
import {filter, map, switchMap, takeWhile} from 'rxjs/operators';
import {User} from '../models/user';

@Component({
  selector: 'my-view-user',
  template: `
    <h1>{{this.user ? this.user.email : ''}}</h1>
    <h1>{{this.user ? this.user.name : ''}}</h1>
  `,
  styles: [``]
})

export class ViewUserComponent implements OnDestroy {
  isAlive = true;
  user: User;

  constructor(private route: ActivatedRoute, private repository: Repository) {
    // this.route.params.subscribe(data => {
    //   this.myRepo.getUserById(data.id).subscribe(user => {
    //     console.log(user);
    //   });
    // });
    this.fetchData();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  fetchData() {
    const user$ = this.route.params.pipe(map(data => data.id),
      takeWhile(() => this.isAlive),
      switchMap((id) => {
        return this.repository.getUserById(id);
      }), filter(res => !!res));
    user$.subscribe(data => {
      this.user = data;
    });
  }

}
