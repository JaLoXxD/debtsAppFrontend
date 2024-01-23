import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log("enter")
  console.log(state.url)
  return inject(AuthService).isLoggedIn() && !inject(UserService).userInfo?.resetPassword/*  && !sessionStorage.getItem('currentRoute') */
    ? true
    // : sessionStorage.getItem('currentRoute') ? redirectToCurrentRoute(state.url)
    : inject(UserService).userInfo?.resetPassword ? inject(Router).createUrlTree(['/update-password']) : inject(Router).createUrlTree(['/auth/login']);
};

// const redirectToCurrentRoute = (route: string) => {
//   const currentRoute = sessionStorage.getItem('currentRoute');
//   console.log(route)
//   console.log(currentRoute)
//   console.log(inject(Router).ur)
//   if(route != currentRoute){
//     sessionStorage.removeItem('currentRoute');
//   }
//   return inject(Router).createUrlTree([currentRoute]);
// }