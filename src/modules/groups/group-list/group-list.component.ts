import { Component, inject, OnInit } from '@angular/core';
import { Group } from '../../../entities/group';
import { UsersService } from '../../../services/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.css'
})
export class GroupListComponent implements OnInit{
  usersService = inject(UsersService);
  groups: Group[] = [];

  ngOnInit() {
    this.usersService.getGroups().subscribe(g => this.groups = g);
  }
}
