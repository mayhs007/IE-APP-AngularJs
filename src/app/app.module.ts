import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelper } from 'angular2-jwt';
import { routing } from '../routes/app.routes';
import { AuthGuard } from './guard/auth.guard';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
/////////////////////////////////////////////
import { AuthService } from './services/auth/auth.service';
import { AppService } from './services/app/app.service';
import { RegistrationService } from './services/registration/registration.service';
import { DepartmentService } from './services/admin/department/department.service';
import { YearService } from './services/admin/year/year.service';
import { SectionService } from './services/admin/section/section.service';
import { MajorService } from './services/admin/major/major.service';
/////////////////////////////////////////////
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';

////////////////////////////////////////////
import { UsersComponent } from './component/user/user.component';
import { UsersHomeComponent } from './component/user/user-home/user-home.component';
import { UsersRegistrationComponent } from './component/user/user-registration/user-registration.component';
////////////////////////////////////////////
import { AdminsComponent } from './component/admin/admin.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { AdminNavbarComponent } from './component/admin/admin-navbar/admin-navbar.component';
import { AdminSideBarComponent } from './component/admin/admin-side-bar/admin-side-bar.component';
import { AdminUserComponent } from './component/admin/user/admin-user/admin-user.component';
import { DepartmentComponent } from './component/admin/department/department.component';
import { SectionComponent } from './component/admin/section/section.component';
import { YearComponent } from './component/admin/year/year.component';

///////////////////////////////////////////
import { AuthComponent } from './component/auth/auth.component';
import { LoginComponent } from './component/auth/login/login.component';

import { ErrorMessageComponent } from './component/error-message/error-message.component';
import { StudentUserComponent } from './component/admin/user/student-user/student-user.component';
import { MajorComponent } from './component/admin/major/major.component';
import { UserNavbarComponent } from './component/user/user-navbar/user-navbar.component';
import { UserSideBarComponent } from './component/user/user-side-bar/user-side-bar.component';







@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminsComponent,
    UsersComponent,
    UsersHomeComponent,
    UsersRegistrationComponent,
    AdminHomeComponent,
    AuthComponent,
    LoginComponent,
    ErrorMessageComponent,
    AdminNavbarComponent,
    DepartmentComponent,
    SectionComponent,
    YearComponent,
    AdminSideBarComponent,
    AdminUserComponent,
    StudentUserComponent,
    MajorComponent,
    UserNavbarComponent,
    UserSideBarComponent

  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AppService,
    RegistrationService,
    DepartmentService,
    YearService,
    SectionService,
    MajorService,
    JwtHelper,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
