import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../entities/user';
import { UserEditComponent } from "../user-edit/user-edit.component";

@Component({
  selector: 'app-extended-users',
  standalone: true,
  imports: [UserEditComponent],
  templateUrl: './extended-users.component.html',
  styleUrl: './extended-users.component.css'
})
export class ExtendedUsersComponent implements OnInit{
  usersService = inject(UsersService);
  users: User[] = [];
  selectedUser: User = new User('','');
  actionWithUser: 'add'|'edit' = 'add';

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getExtendedUsers().subscribe(users => {
      this.users = users;
    });
  }

  userEdited(user: User) {
      this.usersService.saveUser(user).subscribe(savedUser => {
        if (user.id) {
          this.users = this.users.map(u => u.id === user.id ? savedUser : u)
        } else {
          this.users = [...this.users, savedUser];
        }
      });
  }
  deleteUser(user:User) {
    if (confirm("Do you really want to delete user " + user.name + "?")) {
      this.usersService.deleteUser(user.id!).subscribe(success => {
        this.loadUsers();
      });
    }
  }
  editUserClick(user: User) {
    this.actionWithUser = 'edit';
    this.selectedUser = user;
  }
  addUserClick() {
    this.actionWithUser = 'add';
    this.selectedUser = new User('','');
  }
}
