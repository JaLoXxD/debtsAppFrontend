import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from "./views/login-view/login-view.component";
import { HomeViewComponent } from "./views/home-view/home-view.component";
import { authGuard } from "./services";
import { RecoverPasswordViewComponent } from "./views/recover-password-view/recover-password-view.component";
import { RegisterViewComponent } from "./views/register-view/register-view.component";
import { UpdatePasswordViewComponent } from "./views/update-password-view/update-password-view.component";
import { CreateDebtViewComponent } from "./views/create-debt-view/create-debt-view.component";
import { DebtsViewComponent } from "./views/debts-view/debts-view.component";
import { DebtsPaymentsViewComponent } from "./views/debts-payments-view/debts-payments-view.component";
import { EditPaymentViewComponent } from "./views/edit-payment-view/edit-payment-view.component";

const routes: Routes = [
  { path: '', component: HomeViewComponent, canActivate: [authGuard] },
  { path: "auth/login", component: LoginViewComponent },
  { path: "auth/recover-password", component: RecoverPasswordViewComponent },
  { path: "auth/register", component: RegisterViewComponent },
  { path: "update-password", component: UpdatePasswordViewComponent },
  { path: 'debt/create', component: CreateDebtViewComponent, canActivate: [authGuard] },
  { path: 'debt/list', component: DebtsViewComponent, canActivate: [authGuard] },
  { path: 'debt/detail', component: DebtsPaymentsViewComponent, canActivate: [authGuard] },
  { path: 'debt/payment/:id', component: EditPaymentViewComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
