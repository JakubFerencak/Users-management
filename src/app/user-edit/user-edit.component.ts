import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from '../../entities/user';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Group } from '../../entities/group';

@Component({
  selector: 'user-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit, OnChanges {
  @Output() userchange = new EventEmitter<User>();
  @Input('user') inputUser: User = new User("","");
  user: User = new User("","");
  @Input() action: 'add'|'edit' = 'add';
  usersService = inject(UsersService);
  groupsModel: {group: Group, selected: boolean}[] = [];

  ngOnInit(): void {
      this.usersService.getGroups().subscribe(groups => {
        this.groupsModel = groups.map(group => ({group, selected: false}));
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.user = User.clone(this.inputUser);
    this.groupsModel.forEach(gm => 
        gm.selected = this.user.groups.some(ug => ug.id === gm.group.id)
    );
  }

  getUserJson() {
    return JSON.stringify(this.user);
  }

  saveUser() {
    console.log("submit");
    const userGroups = this.groupsModel.filter(gm => gm.selected).map(gm => gm.group);
    this.user.groups = userGroups;
    this.userchange.emit(this.user);
  }
}
