import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NewUserComponent } from './auth/new-user/new-user.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: NewUserComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotComponent,
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then((m) => m.CustomersModule),
  },
  {
    path: 'invoices',
    loadChildren: () =>
      import('./invoices/invoices.module').then((m) => m.InvoicesModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  { path: 'sales', loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
