import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../entities/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  title = 'Users';
  users: User[] = [
    new User("Jano", "jano@jano.sk", 1, new Date()),
    new User("Fero", "fero@jano.sk"),
    {name: "Anka", email: "anka@anka.sk", password: "qwerty"}
  ];
}
