import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanDeactivateComponent {
  canDeactivate: () => boolean | Observable<boolean>;
}

export const deactivateGuard: CanDeactivateFn<CanDeactivateComponent> = (component, currentRoute, currentState, nextState) => {
  return component.canDeactivate();
};
