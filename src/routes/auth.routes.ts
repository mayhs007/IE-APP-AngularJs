import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/component/auth/login/login.component';
import { AuthGuard } from '../app/guard/auth.guard';


export const AUTH_ROUTE: Routes = [
     { path: 'login', component: LoginComponent}
 ];
