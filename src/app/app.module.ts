import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/authentication/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {httpInterceptorProviders} from "./interceptors";
import {DataTablesModule} from "angular-datatables";
import { VisaDetailsComponent } from './views/visa-request/visa-details/visa-details.component';
import { VisaOverviewComponent } from './views/visa-request/visa-overview/visa-overview.component';
import { ResellersListComponent } from './views/reseller/resellers-list/resellers-list.component';
import { ResellersDetailsComponent } from './views/reseller/resellers-details/resellers-details.component';
import {DatePipe} from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { VisaListComponent } from './views/visa/visa-list/visa-list.component';
import { CustomerListComponent } from './views/customer/customer-list/customer-list.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    VisaDetailsComponent,
    VisaOverviewComponent,
    ResellersListComponent,
    ResellersDetailsComponent,
    VisaListComponent,
    CustomerListComponent,
  ],
    imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    AngularMultiSelectModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    httpInterceptorProviders,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
