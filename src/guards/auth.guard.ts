import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { UsersService } from '../services/users.service';
import { MessageService } from '../services/message.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log("Auth guard activated");
  const usersService = inject(UsersService);
  const router = inject(Router);
  const messageService = inject(MessageService);
  const decision = usersService.isLoggedIn();
  if (!decision) {
    usersService.navigateAfterLogin = state.url; // kam chcel ist
    router.navigateByUrl("/login");
    messageService.success("You need to log in first");
  }
  return decision;
};

export const authMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return privateGuard(route.path!);
};

const privateGuard = (url: string) => {
  return true;
};
