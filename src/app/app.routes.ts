import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InvoicesPageComponent } from './components/invoices-page/invoices-page.component';
import { AuthGuard } from './core/app.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // default route
  { path: 'login', component: LoginComponent },
  { path: 'invoices', component: InvoicesPageComponent , canActivate: [AuthGuard] }
];
