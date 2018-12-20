import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../services/admin/department/department.service';

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css']
})
export class AdminSideBarComponent implements OnInit {

  constructor(private departmentService: DepartmentService) { }
  departments: any;
  ngOnInit() {
    this.getDepartments();
  }
  getDepartments() {
    this.departmentService.readDepartment().subscribe((response: any) => {
     this.departments = response.docs;
    });

  }

}
