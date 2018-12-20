import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../services/admin/department/department.service';
import { MajorService } from '../../../services/admin/major/major.service';
import { YearService } from '../../../services/admin/year/year.service';
import { SectionService } from '../../../services/admin/section/section.service';
import { ClassService } from '../../../services/admin/class/class.service';
declare var M: any;
@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor(private classService:ClassService , private majorService: MajorService,private departmentService: DepartmentService,private yearService: YearService,private sectionService: SectionService) { }
  classes: any;
  majors: any;
  departments: any;
  sections: any;
  years: any;
  Button: any;
  ngOnInit() {
    this.Button="Create";
    this.createForm();
    this.getClass();
    this.getMajors();
    this.getDepartments();
    this.getYears();
    this.getSections();
  }
  createForm() {
  
  }
  getClass(){
    this.classService.readClass().subscribe((response: any) => {
     /* if(response.error)
      {
        M.toast({ html: response.msg , classes: 'roundeds'});
      }else{*/
        this.classes=response.msg;
     // }
     });
  }
  getMajors() {
    this.majorService.readMajor().subscribe((response: any) => {
     this.majors = response.docs;
    });

  }
  getDepartments() {
    this.departmentService.readDepartment().subscribe((response: any) => {
     this.departments = response.docs;
    });

  }
  getSections() {
    this.sectionService.readSection().subscribe((response: any) => {
     this.sections = response.docs;
    });

  }
  getYears() {
    this.yearService.readYear().subscribe((response: any) => {
     this.years = response.docs;
    });
  }
  onSubmit(values){
    this.classService.createClass(values).subscribe((response: any)=>{
      if(response.error){
        M.toast({ html: response.msg , classes: 'roundeds'});
        this.getClass();
        this.getMajors();
        this.getDepartments();
        this.getYears();
        this.getSections();
        this.createForm();
      }
      else{
        M.toast({ html: response.msg , classes: 'roundeds'});
        this.getClass();
        this.getMajors();
        this.getDepartments();
        this.getYears();
        this.getSections();
        this.createForm();
      }
    })
  }
  deleteClass(id: string) {
    this.classService.deleteClass(id).subscribe((response: any) => {
      if ( response.error ) {
        M.toast({ html: response.msg , classes: 'roundeds'});
        this.getClass();
        this.getMajors();
        this.getDepartments();
        this.getYears();
        this.getSections();
        this.createForm();
      } else {
        M.toast({ html: response.msg , classes: 'roundeds'});
        this.getClass();
        this.getMajors();
        this.getDepartments();
        this.getYears();
        this.getSections();
        this.createForm();
      }
    });
    }

}
