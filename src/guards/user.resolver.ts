import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { User } from '../entities/user';
import { UsersService } from '../services/users.service';

export const userResolver: ResolveFn<User[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const usersService = inject(UsersService);
  return usersService.getUsers();
};