import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  title = 'Users';
  users: User[] = [
    new User("Jano", "jano@jano.sk", 1, new Date()),
    new User("Fero", "fero@jano.sk"),
    {name: "Anka", email: "anka@anka.sk", password: "qwerty"}
  ];
  selectedUser?: User;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(u => this.users = u);
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }
}
