import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Group } from '../../../entities/group';
import { UsersService } from '../../../services/users.service';
import { MessageService } from '../../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { CanDeactivateComponent } from '../../../guards/deactivate.guard';

@Component({
  selector: 'app-group-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './group-edit.component.html',
  styleUrl: './group-edit.component.css'
})
export class GroupEditComponent implements OnInit, CanDeactivateComponent {
  usersService = inject(UsersService);
  messageService = inject(MessageService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  initialGroupName = '';
  initialPermissions = '';
  group = new Group('');
  permissionsModel = '';
  saved = false;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      filter(groupId => groupId > 0),
      switchMap(groupId => this.usersService.getGroup(groupId))
    ).subscribe(g => {
      this.group = g;
      this.permissionsModel = this.group.permissions.join(', ');
      this.initialGroupName = g.name;
      this.initialPermissions = `${this.permissionsModel}`;
    });
  }

  saveGroup() {
    this.group.permissions = this.permissionsModel.split(',')
                                   .map(perm => perm.trim())
                                   .filter(perm => perm.length > 0);
    this.usersService.saveGroup(this.group).subscribe(savedGroup => {
      this.saved = true;
      this.messageService.success("Group " + savedGroup.name + " saved successfully");
      this.router.navigateByUrl('/groups/list');
    });
  }

  canDeactivate(): boolean | Observable<boolean> {
    console.log("Deactivate guard started")
    if (this.saved) return true;

    if ((this.initialGroupName === this.group.name) 
      && (this.initialPermissions === this.permissionsModel)) {
        return true; // nothing is changed
    }
    if (confirm("Group is changed but not saved, do you want to leave the page anyway?")) {
      return true; // user want to leave without saving
    }
    return false; // user want to return and save 
  }
}
