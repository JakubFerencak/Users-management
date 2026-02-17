import { Routes } from "@angular/router";
import { GroupListComponent } from "./group-list/group-list.component";
import { GroupDetailComponent } from "./group-detail/group-detail.component";
import { GroupsMenuComponent } from "./groups-menu/groups-menu.component";
import { GroupEditComponent } from "./group-edit/group-edit.component";
import { authGuard } from "../../guards/auth.guard";
import { deactivateGuard } from "../../guards/deactivate.guard";

export const GROUP_ROUTES: Routes = [
  {path: '', component: GroupsMenuComponent, children: [
    {path: 'list', component: GroupListComponent},
    {path: 'detail/:id', component: GroupDetailComponent, data: {daco: 1}},
    {path: 'new', component: GroupEditComponent, 
      canActivate:[authGuard],
      canDeactivate:[deactivateGuard]
    },
    {path: 'edit/:id', component: GroupEditComponent, 
      canActivate:[authGuard],
      canDeactivate:[deactivateGuard]},
    {path: '', redirectTo: 'list', pathMatch: 'full'},
  ]}
];