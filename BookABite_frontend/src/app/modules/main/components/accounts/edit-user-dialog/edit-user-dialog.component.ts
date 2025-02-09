import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css'],
})
export class EditUserDialogComponent implements OnInit {
  validateForm!: FormGroup;
  user: any;

  userTypes = [
    { value: 0, label: 'Admin' },
    { value: 1, label: 'User' },
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalRef: NzModalRef,
    private msg: NzMessageService,
    private modal: NzModalService
  ) {
    this.user = this.modalRef.getConfig().nzData.user;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userId: [this.user?.id],
      name: [this.user?.name, [Validators.required]],
      surname: [this.user?.surname, [Validators.required]],
      username: [this.user?.username, [Validators.required]],
      userType: [this.user?.userType, [Validators.required]],
    });
  }

  updateUser(): void {
    if (this.validateForm.valid) {
      const payload = this.validateForm.value;
      console.log(payload);
      this.userService.updateUser(payload).subscribe(() => {
        this.modalRef.close(true);
      });
    }
  }

  resetPassword(): void {
    this.userService.resetPassword(this.user.id).subscribe(
      (newPassword: string) => {
        console.log('New password:', newPassword);
        this.modal.info({
          nzTitle: 'Password Reset Successful',
          nzContent: `Your new password is: <strong>${newPassword}</strong>`,
          nzOnOk: () => console.log('OK Clicked')
        });
      },
      (error) => {
        console.error('Password reset failed:', error);
        this.msg.error('Failed to reset password');
      }
    );
  }
}
