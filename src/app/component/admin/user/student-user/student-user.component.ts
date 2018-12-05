import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../../services/admin/department/department.service';
import { FormGroup, FormBuilder, NgForm, FormControl } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';
import { YearService } from '../../../../services/admin/year/year.service';
import { SectionService } from '../../../../services/admin/section/section.service';
import { MajorService } from '../../../../services/admin/major/major.service';

@Component({
  selector: 'app-student-user',
  templateUrl: './student-user.component.html',
  styleUrls: ['./student-user.component.css']
})
export class StudentUserComponent implements OnInit {

  constructor(
    private departmentService: DepartmentService,
    private yearService: YearService,
    private sectionService: SectionService,
    private majorService: MajorService,
    private formBuilder: FormBuilder) { }
  studentForm: FormGroup;
  departments: any;
  years: any;
  sections: any;
  majors: any;
  ngOnInit() {
  this.getDepartments();
  this.getYears();
  this.getSections();
  this.getMajors();
  this.createForm();
  }
  createForm() {
  }
  getDepartments() {
    this.departmentService.readDepartment().subscribe((response: any) => {
     this.departments = response.docs;
    });

  }
  getYears() {
    this.yearService.readYear().subscribe((response: any) => {
     this.years = response.docs;
    });

  }
  getSections() {
    this.sectionService.readSection().subscribe((response: any) => {
     this.sections = response.docs;
    });

  }
  getMajors() {
    this.majorService.readMajor().subscribe((response: any) => {
     this.majors = response.docs;
    });
  }

  onSubmit(values: any) {

      console.log('hello' + values.departmentName);  }

}
