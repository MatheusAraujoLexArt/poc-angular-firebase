import { Routes } from '@angular/router';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AccountFormComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  }
];
