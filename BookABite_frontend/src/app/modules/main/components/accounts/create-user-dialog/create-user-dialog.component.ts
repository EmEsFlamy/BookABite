import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

interface User {
  id: number;
  name: string;
  surname: string;
  username: string;
  userType: number;
}

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.css'],
})
export class CreateUserDialogComponent {
  validateForm: FormGroup;

  userTypes = [
    { value: 0, label: 'Admin' },
    { value: 1, label: 'User' },
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalRef: NzModalRef,
    private modal: NzModalService,
    private msg: NzMessageService,
  ) {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      userType: [null, [Validators.required]],
    });
  }

  createUser(): void {
    if (this.validateForm.valid) {
      const payload = this.validateForm.value;
  
      this.userService.getUsers().subscribe(
        (data: User[]) => {
          const usernameExists = data.some((user: User) => user.username === payload.username);
  
          if (usernameExists) {
            const modalRef = this.modal.create({
              nzTitle: 'Username already exists!',
              nzContent: 'The username you entered is already taken. Please choose a different one.',
              nzFooter: [
                {
                  label: 'OK',
                  type: 'primary',
                  onClick: () => {
                    document.getElementById('username')?.focus();
                    modalRef.close();
                  }
                }
              ]
            });
          } else {
            this.userService.addUser(payload).subscribe(
              () => {
                this.modalRef.close(true);
                this.msg.success('User created successfully');
              },
              (error) => {
                this.msg.error('Failed to create user');
              }
            );
          }
        },
        (error) => {
          this.msg.error('Failed to load users.');
        }
      );
    }
    console.log(this.validateForm.value);
  }
  
  
}
