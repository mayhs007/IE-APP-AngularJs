import { RouterModule, Routes } from '@angular/router';
import { UsersHomeComponent } from '../app/component/user/user-home/user-home.component';
import { UsersRegistrationComponent } from 'src/app/component/user/user-registration/user-registration.component';

export const USER_ROUTE: Routes = [
     { path: 'home', component: UsersHomeComponent },
     { path : 'registration', component: UsersRegistrationComponent}
 ];
