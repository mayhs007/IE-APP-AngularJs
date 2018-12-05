import { Component, OnInit } from '@angular/core';
import { YearService } from '../../../services/admin/year/year.service';
import { AuthService } from '../../../services/auth/auth.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
declare var M: any;
@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit {
  yearForm: FormGroup;
  years: any;
  Button: any;
  constructor(private yearService: YearService, private authService: AuthService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.createForm();
    this.getYears();
  }
  onSubmit(form: NgForm) {
    if ( form.value._id === '') {
      this.yearService.createYear( this.yearForm.get('name').value ).subscribe((response: any) => {
        if ( response.error ) {
          M.toast({ html: response.msg , classes: 'roundeds'});
          this.getYears();
          this.createForm();
        } else {
          M.toast({ html: response.msg , classes: 'roundeds'});
          this.getYears();
          this.createForm();
        }
      });
    } else {
      this.yearService.updateYear(form.value._id, form.value.name).subscribe((response: any) => {
        if ( response.error ) {
          M.toast({ html: response.msg , classes: 'roundeds'});
          this.getYears();
          this.createForm();
        } else {
          M.toast({ html: response.msg , classes: 'roundeds'});
          this.getYears();
          this.createForm();
        }
      });
    }
    this.createForm();
  }
  createForm() {
    this.yearForm = this.formBuilder.group({
      _id: '',
      name: ''
    });
    this.Button = 'Create';
  }
  getYears() {
    this.yearService.readYear().subscribe((response: any) => {
     this.years = response.docs;
    });

  }
  deleteYear(id: string) {
  this.yearService.deleteYear(id).subscribe((response: any) => {
    if ( response.error ) {
      M.toast({ html: response.msg , classes: 'roundeds'});
      this.getYears();
      this.createForm();
    } else {
      M.toast({ html: response.msg , classes: 'roundeds'});
      this.getYears();
      this.createForm();
    }
  });
  }
  updateYear(id: string, name: string ) {
    this.yearForm.setValue({
      _id: id,
      name: name
    });
    this.Button = 'Update';
  }
}
