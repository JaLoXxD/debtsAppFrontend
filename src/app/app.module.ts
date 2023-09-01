import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClientModule } from "@angular/common/http";
import { HomeViewComponent } from './views/home-view/home-view.component';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CustomAlertComponent } from './shared/custom-alert/custom-alert.component';
import { RecoverPasswordViewComponent } from './views/recover-password-view/recover-password-view.component';
import { RecoverPasswordFormComponent } from './components/recover-password-form/recover-password-form.component';
import { AuthContainerComponent } from './shared/auth-container/auth-container.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { CreateDebtViewComponent } from './views/create-debt-view/create-debt-view.component';
import { CustomInputComponent } from './shared/custom-input/custom-input.component';
import { CustomButtonComponent } from './shared/custom-button/custom-button.component';
import { ProvideParentFormDirective } from './shared/directives/provide-parent-form.directive';
import { HttpErrorInterceptor } from "./services/error/http-error.interceptor.service";
import { BaseComponent } from "./shared/base/base.component";
import { UpdatePasswordViewComponent } from './views/update-password-view/update-password-view.component';
import { UpdatePasswordFormComponent } from './components/update-password-form/update-password-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RegisterViewComponent } from './views/register-view/register-view.component';
import { LangSelectorComponent } from './components/lang-selector/lang-selector.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { AuthInterceptor } from './services/auth/auth.interceptor.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    LoginViewComponent,
    LoginFormComponent,
    NavbarComponent,
    HomeViewComponent,
    CustomAlertComponent,
    RecoverPasswordViewComponent,
    RecoverPasswordFormComponent,
    AuthContainerComponent,
    SpinnerComponent,
    CreateDebtViewComponent,
    CustomInputComponent,
    CustomButtonComponent,
    ProvideParentFormDirective,
    UpdatePasswordViewComponent,
    UpdatePasswordFormComponent,
    RegisterFormComponent,
    RegisterViewComponent,
    LangSelectorComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
