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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CustomAlertComponent } from './shared/components/custom-alert/custom-alert.component';
import { RecoverPasswordViewComponent } from './views/recover-password-view/recover-password-view.component';
import { RecoverPasswordFormComponent } from './components/recover-password-form/recover-password-form.component';
import { AuthContainerComponent } from './shared/components/auth-container/auth-container.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { CreateDebtViewComponent } from './views/create-debt-view/create-debt-view.component';
import { CustomInputComponent } from './shared/components/custom-input/custom-input.component';
import { CustomButtonComponent } from './shared/components/custom-button/custom-button.component';
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
import { CreateDebtFormComponent } from './components/create-debt-form/create-debt-form.component';
import { CustomDropdownComponent } from './shared/components/custom-dropdown/custom-dropdown.component';
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
/* PRIME NG */
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';

import { CustomDatePickerComponent } from './shared/components/custom-date-picker/custom-date-picker.component';
import { DebtsViewComponent } from './views/debts-view/debts-view.component';
import { CustomTableComponent } from './shared/components/custom-table/custom-table.component';
import { DebtsListComponent } from './components/debts-list/debts-list.component';
import { CustomPaginatorIntl } from "./shared/components/custom-table/custom-paginator-int";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { CustomModalComponent } from './shared/components/custom-modal/custom-modal.component';
import { CloseModalDirective } from './shared/directives/close-modal.directive';
import { DebtsPaymentsViewComponent } from './views/debts-payments-view/debts-payments-view.component';
import { PaymentsListComponent } from './components/payments-list/payments-list.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { EditPaymentViewComponent } from './views/edit-payment-view/edit-payment-view.component';
import { EditPaymentFormComponent } from './components/edit-payment-form/edit-payment-form.component';
import { CustomFileUploaderComponent } from './shared/components/custom-file-uploader/custom-file-uploader.component';
import { CustomTitleComponent } from './shared/components/custom-title/custom-title.component';
import { ImagePreviewComponent } from './shared/components/image-preview/image-preview.component';
import { DebtInfoHeaderComponent } from './components/debt-info-header/debt-info-header.component';
import { CustomSwitchComponent } from './shared/components/custom-switch/custom-switch.component';

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
    DropdownDirective,
    CreateDebtFormComponent,
    CustomDropdownComponent,
    CustomDatePickerComponent,
    DebtsViewComponent,
    CustomTableComponent,
    DebtsListComponent,
    CustomModalComponent,
    CloseModalDirective,
    DebtsPaymentsViewComponent,
    PaymentsListComponent,
    EditPaymentViewComponent,
    EditPaymentFormComponent,
    CustomFileUploaderComponent,
    CustomTitleComponent,
    ImagePreviewComponent,
    DebtInfoHeaderComponent,
    CustomSwitchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    NgxMatSelectSearchModule,
    InputNumberModule,
    AutoCompleteModule,
    CalendarModule,
    InputSwitchModule,
    TableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    CurrencyPipe,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { 
      provide: MatPaginatorIntl, 
      useClass: CustomPaginatorIntl 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
