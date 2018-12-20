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

  sectionForm: FormGroup;
  sections: any;
  Button: any;
  constructor(private sectionService: SectionService, private authService: AuthService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.createForm();
    this.getSections();
  }
  onSubmit(form: NgForm) {
    if ( form.value._id === '') {
      this.sectionService.createSection( this.sectionForm.get('name').value ).subscribe((response: any) => {
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
      this.sectionService.updateSection(form.value._id, form.value.name).subscribe((response: any) => {
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
    this.sectionForm = this.formBuilder.group({
      _id: '',
      name: ''
    });
    this.Button = 'Create';
  }
  getSections() {
    this.sectionService.readSection().subscribe((response: any) => {
     this.sections = response.docs;
    });

  }
  deleteSection(id: string) {
  this.sectionService.deleteSection(id).subscribe((response: any) => {
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
    this.sectionForm.setValue({
      _id: id,
      name: name
    });
  }
}
