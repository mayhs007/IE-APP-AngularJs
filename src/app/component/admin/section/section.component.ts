import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../../services/admin/section/section.service';
import { AuthService } from '../../../services/auth/auth.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
declare var M: any;
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  yearForm: FormGroup;
  sections: any;
  Button: any;
  constructor(private yearService: SectionService, private authService: AuthService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.createForm();
    this.getSections();
  }
  onSubmit(form: NgForm) {
    if ( form.value._id === '') {
      this.yearService.createSection( this.yearForm.get('name').value ).subscribe((response: any) => {
        if ( response.error ) {
          M.toast({ html: response.msg , classes: 'roundeds'});
          this.getSections();
          this.createForm();
        } else {
          M.toast({ html: response.msg , classes: 'roundeds'});
          this.getSections();
          this.createForm();
        }
      });
    } else {
      this.yearService.updateSection(form.value._id, form.value.name).subscribe((response: any) => {
        if ( response.error ) {
          M.toast({ html: response.msg , classes: 'roundeds'});
          this.getSections();
          this.createForm();
        } else {
          M.toast({ html: response.msg , classes: 'roundeds'});
          this.getSections();
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
  getSections() {
    this.yearService.readSection().subscribe((response: any) => {
     this.sections = response.docs;
    });

  }
  deleteSection(id: string) {
  this.yearService.deleteSection(id).subscribe((response: any) => {
    if ( response.error ) {
      M.toast({ html: response.msg , classes: 'roundeds'});
      this.getSections();
      this.createForm();
    } else {
      M.toast({ html: response.msg , classes: 'roundeds'});
      this.getSections();
      this.createForm();
    }
  });
  }
  updateSection(id: string, name: string ) {
    this.Button = 'Update';
    this.yearForm.setValue({
      _id: id,
      name: name
    });
  }
}
