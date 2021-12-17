import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './views/authentication/login/login.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {AuthGuard} from "./guards/auth/auth.guard";
import {VisaOverviewComponent} from "./views/visa-request/visa-overview/visa-overview.component";
import {VisaDetailsComponent} from "./views/visa-request/visa-details/visa-details.component";
import {ResellersListComponent} from './views/reseller/resellers-list/resellers-list.component';
import {ResellersDetailsComponent} from './views/reseller/resellers-details/resellers-details.component';
import {VisaListComponent} from './views/visa/visa-list/visa-list.component';
import {CustomerListComponent} from './views/customer/customer-list/customer-list.component';
import {TransactionListComponent} from './views/transactions/transaction-list/transaction-list.component';
import {AgenciesListComponent} from './views/agencies/agencies-list/agencies-list.component';
import {VisaRequestListComponent} from './views/visa-request/visa-request-list/visa-request-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    data : {title : 'login'},
    pathMatch: 'full'
  },
  {
    path: 'login',
    data : {title : 'login'},
    component: LoginComponent
  },
  {
    path: 'dashboard/visa-requests',
    data : {title : 'dashboard'},
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children:[
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: VisaOverviewComponent
      },
      {
        path: ':id',
        component: VisaDetailsComponent
      },
    ]
  },
  {
    path: 'visa-requests',
    data : {title : 'visa-requests'},
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children:[
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: VisaRequestListComponent
      },
      {
        path: ':id',
        component: VisaDetailsComponent
      },
    ]
  },
  {
    path: 'visas',
    data : {title : 'visas'},
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children:[
      {
        path: '',
        component: VisaListComponent
      }
    ]
  },
  {
    path: 'costumers',
    data : { title : 'costumers' },
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children:[
      {
        path: '',
        component: CustomerListComponent
      }
    ]
  },
  {
    path: 'transactions',
    data : { title : 'transactions' },
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children:[
      {
        path: '',
        component: TransactionListComponent
      }
    ]
  },
  {
    path: 'agencies',
    data : { title : 'agencies' },
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children:[
      {
        path: '',
        component: AgenciesListComponent
      }
    ]
  },
  {
    path: 'company/resellers',
    data : {title : 'company'},
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children:[
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: ResellersListComponent
      },
      {
        path: ':id',
        component: ResellersDetailsComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
