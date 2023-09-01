import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthService).isLoggedIn() && !inject(UserService).userInfo?.resetPassword
    ? true
    : inject(UserService).userInfo?.resetPassword ? inject(Router).createUrlTree(['/update-password']) : inject(Router).createUrlTree(['/auth/login']);
};