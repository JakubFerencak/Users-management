import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExtendedUsersComponent } from './extended-users/extended-users.component';
import { authGuard } from '../guards/auth.guard';
import { userResolver } from '../guards/user.resolver';

export const routes: Routes = [
  {path: 'users', component: UsersComponent, resolve: {users: userResolver}, data: {myText: 'Hello'}},
  {path: 'extended-users', 
    component: ExtendedUsersComponent, 
    canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'groups', 
   loadChildren: () => import('../modules/groups/groups.module')},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];
