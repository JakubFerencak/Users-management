import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../entities/user';

@Component({
  selector: 'app-extended-users',
  standalone: true,
  imports: [],
  templateUrl: './extended-users.component.html',
  styleUrl: './extended-users.component.css'
})
export class ExtendedUsersComponent implements OnInit{
  usersService = inject(UsersService);
  users: User[] = [];

  ngOnInit(): void {
    this.usersService.getExtendedUsers().subscribe(users => {
      this.users = users;
      console.log('Extended users:', users);
    });
  }
}
