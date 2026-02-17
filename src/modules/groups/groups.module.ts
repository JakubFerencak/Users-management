import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list/group-list.component';
import { RouterModule } from '@angular/router';
import { GROUP_ROUTES } from './groups.routes';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GroupListComponent,
    RouterModule.forChild(GROUP_ROUTES)
  ],
  exports:[GroupListComponent]
})
export default class GroupsModule { }
