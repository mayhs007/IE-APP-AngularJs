import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from '../app/component/admin/admin-home/admin-home.component';
import {DepartmentComponent } from '../app/component/admin/department/department.component';
import { YearComponent } from '../app/component/admin/year/year.component';
import { SectionComponent } from '../app/component/admin/section/section.component';
import { AdminUserComponent } from '../app/component/admin/user/admin-user/admin-user.component';
import { StudentUserComponent } from '../app/component/admin/user/student-user/student-user.component';
import { MajorComponent } from '../app/component/admin/major/major.component';
import { ClassComponent } from '../app/component/admin/class/class.component';
import { AdminRegistrationComponent } from '../app/component/admin/admin-registration/admin-registration.component';

export const ADMIN_ROUTE: Routes = [
     { path: 'home', component: AdminHomeComponent },
     { path: 'class', component: ClassComponent},
     { path: 'major', component: MajorComponent},
     { path: 'department', component: DepartmentComponent},
     { path: 'year', component: YearComponent },
     { path: 'section', component: SectionComponent },
     { path: 'admins', component: AdminUserComponent},
     { path: 'students', component: StudentUserComponent},
     { path: 'registration/:id', component: AdminRegistrationComponent}
 ];
