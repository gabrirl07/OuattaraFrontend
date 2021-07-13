import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './views/authentication/login/login.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';

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
    path: 'dashboard',
    data : {title : 'login'},
    component: DashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
