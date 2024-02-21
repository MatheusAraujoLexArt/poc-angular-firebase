import { Routes } from '@angular/router';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AccountFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
