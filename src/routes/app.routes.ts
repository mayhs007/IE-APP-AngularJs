import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from '../app/component/user/user.component';
import { AuthComponent } from '../app/component/auth/auth.component';
import { AdminsComponent } from '../app/component/admin/admin.component';

import { AUTH_ROUTE } from '../routes/auth.routes';
import { USER_ROUTE } from '../routes/users.routes';
import { ADMIN_ROUTE } from '../routes/admin.routes';


import { AuthGuard } from '../app/guard/auth.guard';
import { AdminGuard } from '../app/guard/admin/admin.guard';

const APP_ROUTES: Routes = [
     {path: 'auth', component: AuthComponent , children: AUTH_ROUTE},
     {path: 'user', component: UsersComponent, children: USER_ROUTE},
     {path: 'admin', component: AdminsComponent, children: ADMIN_ROUTE, canActivate: [AuthGuard, AdminGuard]}


];
export const routing = RouterModule.forRoot(APP_ROUTES);
