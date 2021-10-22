import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './views/authentication/login/login.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {AuthGuard} from "./guards/auth/auth.guard";
import {VisaOverviewComponent} from "./views/visa-overview/visa-overview.component";
import {VisaDetailsComponent} from "./views/visa-details/visa-details.component";
import {ResellersListComponent} from './views/resellers-list/resellers-list.component';
import {ResellersDetailsComponent} from './views/resellers-details/resellers-details.component';

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
    path: 'dashboard/visas',
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
    path: 'company/reselers',
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
