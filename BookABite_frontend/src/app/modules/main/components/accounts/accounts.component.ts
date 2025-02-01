import { Component, OnInit } from '@angular/core';
import { UserService, RegisterPayload } from '../../../../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  listOfUsers: any[] = [];
  filteredUsers = [...this.listOfUsers];
  searchTerm = '';

  constructor(
    private userService: UserService,
    private msg: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  // Fetch the list of users from the service
  getUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.listOfUsers = data;
        this.filteredUsers = [...this.listOfUsers];
      },
      (error) => {
        this.msg.error('Failed to load users.');
      }
    );
  }

  // Open a modal to add a new user
  openCreateUserModal(): void {
    const modalRef = this.modal.create({
      nzTitle: 'Create New User',
      nzContent: CreateUserDialogComponent,
      nzOnOk: (instance) => instance.createUser(),
      nzFooter: null,
    });

    modalRef.afterClose.subscribe((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }

  // Open a modal to edit an existing user
  openEditUserModal(user: any): void {
    const modalRef = this.modal.create({
      nzTitle: 'Edit User',
      nzContent: EditUserDialogComponent,
      nzData: { user },
      nzOnOk: (instance) => instance.updateUser(),
    });
  
    modalRef.afterClose.subscribe((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }

  // Delete a user
  deleteUser(id: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure to delete this user?',
      nzOnOk: () => {
        this.userService.deleteUser(id).subscribe(
          () => {
            this.getUsers();
            this.msg.success('User deleted successfully');
          },
          (error) => {
            this.msg.error('Failed to delete user');
          }
        );
      },
    });
  }

  onSearch(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredUsers = this.listOfUsers.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.surname.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term)
    );
  }
}
