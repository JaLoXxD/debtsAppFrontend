import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClient } from "@angular/common/http";
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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
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
    CustomButtonComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
