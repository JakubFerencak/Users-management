import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { Group } from '../../../entities/group';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.css'
})
export class GroupDetailComponent implements OnInit{
  route = inject(ActivatedRoute);
  usersService = inject(UsersService);
  groupId?: number;
  group?: Group;

  ngOnInit(): void {
//    this.groupId = + this.route.snapshot.params['id'];
//    this.usersService.getGroup(this.groupId).subscribe(g => this.group = g);

    // this.route.paramMap.subscribe(params => {
    //   this.groupId = Number(params.get('id'));
    //   this.usersService.getGroup(this.groupId).subscribe(g => this.group = g);
    // });

    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      tap(groupId => this.groupId = groupId),
      switchMap(groupId => this.usersService.getGroup(groupId))
    ).subscribe(g => this.group = g);
  }
}
