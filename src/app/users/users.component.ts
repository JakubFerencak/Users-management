import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  title = 'Users';
  users: User[] = [];
  selectedUser?: User;
  showError = false;

  constructor(route: ActivatedRoute) {
    route.data.subscribe(data => this.users = data['users']);
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

//   ngOnInit(): void {
//     this.usersService.getUsers().subscribe({
//       next: u => {
//         this.users = u;
//         this.showError = false;
//       },
//       error: err => {
//         console.log("Chyba: ", err);
//         this.showError = true;
//       }
//     });
//   }

//   selectUser(user: User) {
//     this.selectedUser = user;
//   }
}
