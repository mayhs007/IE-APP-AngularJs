import { Component, OnInit } from '@angular/core';
import { MajorService } from '../../../services/admin/major/major.service';
import { AuthService } from '../../../services/auth/auth.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
declare var M: any;
@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.css']
})
export class MajorComponent implements OnInit {

  majorForm: FormGroup;
  majors: any;
  Button: any;
  constructor(private majorService: MajorService, private authService: AuthService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.createForm();
    this.getMajors();
  }
  onSubmit(form: NgForm) {
    if ( form.value._id === '') {
      this.majorService.createMajor( this.majorForm.get('name').value ).subscribe((response: any) => {
        if ( response.error ) {
          M.toast({ html: response.msg , classes: 'roundeds'});
          this.getMajors();
          this.createForm();
        } else {
          M.toast({ html: response.msg , classes: 'roundeds'});
          this.getMajors();
          this.createForm();
        }
      });
    } else {
      this.majorService.updateMajor(form.value._id, form.value.name).subscribe((response: any) => {
        if ( response.error ) {
          M.toast({ html: response.msg , classes: 'roundeds'});
          this.getMajors();
          this.createForm();
        } else {
          M.toast({ html: response.msg , classes: 'roundeds'});
          this.getMajors();
          this.createForm();
        }
      });
    }
    this.createForm();
  }
  createForm() {
    this.majorForm = this.formBuilder.group({
      _id: '',
      name: ''
    });
    this.Button = 'Create';
  }
  getMajors() {
    this.majorService.readMajor().subscribe((response: any) => {
     this.majors = response.docs;
    });

  }
  deleteMajor(id: string) {
  this.majorService.deleteMajor(id).subscribe((response: any) => {
    if ( response.error ) {
      M.toast({ html: response.msg , classes: 'roundeds'});
      this.getMajors();
      this.createForm();
    } else {
      M.toast({ html: response.msg , classes: 'roundeds'});
      this.getMajors();
      this.createForm();
    }
  });
  }
  updateMajor(id: string, name: string ) {
    this.Button = 'Update';
    this.majorForm.setValue({
      _id: id,
      name: name
    });
  }
}
