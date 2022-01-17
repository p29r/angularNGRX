import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../models/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Repository} from '../services/repository';

@Component({
  selector: 'my-update-user',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="this.userForm.valid && this.addOrUpdateUser()">
      <div fxLayout="column" fxLayoutAlign="center stretch">
        <mat-form-field>
          <input formControlName="email" matInput placeholder="email"/>
          <mat-error>Valid email is Required</mat-error>
        </mat-form-field>
        <mat-form-field>
          <input formControlName="name" matInput placeholder="username"/>
          <mat-error>Name is Required</mat-error>
        </mat-form-field>
        <button mat-raised-button color="primary"
                type="submit">{{this.data ? 'Update' : 'Add'}}
        </button>
      </div>
    </form>
  `,
  styles: [``]
})

export class UpdateUserComponent implements OnInit {
  userForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<UpdateUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User, private myRepo: Repository) {
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(this.data ? this.data.name : null, [Validators.required]),
      email: new FormControl(this.data ? this.data.email : null, [Validators.required]),
    });
  }


  addOrUpdateUser() {
    if (this.data) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  updateUser() {
    const updatedUser = {...this.data, ...this.userForm.value};
    this.myRepo.updateUser(updatedUser);
    this.dialogRef.close();
  }

  addUser() {
    this.myRepo.addUser(this.userForm.value);
    this.dialogRef.close();
  }
}
