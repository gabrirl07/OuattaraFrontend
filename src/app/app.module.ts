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
import { VisaDetailsComponent } from './views/visa-details/visa-details.component';
import { VisaOverviewComponent } from './views/visa-overview/visa-overview.component';
import { ResellersListComponent } from './views/resellers-list/resellers-list.component';
import { ResellersDetailsComponent } from './views/resellers-details/resellers-details.component';
import {DatePipe} from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

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
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        HttpClientModule,
        DataTablesModule,
        FormsModule,
    ],
  providers: [
    httpInterceptorProviders,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
