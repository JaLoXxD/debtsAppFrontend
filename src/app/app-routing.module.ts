import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from "./views/login-view/login-view.component";
import { HomeViewComponent } from "./views/home-view/home-view.component";
import { authGuard } from "./services";
import { RecoverPasswordViewComponent } from "./views/recover-password-view/recover-password-view.component";

const routes: Routes = [
  { path: '', component: HomeViewComponent, canActivate: [authGuard] },
  { path: "auth/login", component: LoginViewComponent },
  { path: "auth/recover-password", component: RecoverPasswordViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
