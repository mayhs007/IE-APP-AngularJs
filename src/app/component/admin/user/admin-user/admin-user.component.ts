import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../../services/admin/department/department.service';
import { UserService } from '../../../../services/admin/user/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  departments: any;
  users: any;
  constructor( private departmentService: DepartmentService, private userService: UserService ) { }

  ngOnInit() {
    this.getDepartments();
    this.getAdmins();
  }
  getDepartments() {
    this.departmentService.readDepartment().subscribe((response: any) => {
     this.departments = response.docs;
    });
  }
  getAdmins() {
  this.userService.getAdmins().subscribe((response: any) => {
    this.users = response;
  });
  }

}
