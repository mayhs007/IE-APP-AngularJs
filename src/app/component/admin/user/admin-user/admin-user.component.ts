import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/admin/user/user.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassService } from '../../../../services/admin/class/class.service';
declare var M: any;
@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  adminUserForm: FormGroup;
  classes: any;
  users: any;
  constructor( private classService:ClassService, private userService: UserService,private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.createForm();
    this.getClasses();
    this.getAdmins();
  }
  createForm()
  {
    this.adminUserForm = this.formBuilder.group({
      _id:[''],
      admission_number:[''],
      roll_number:[''],
      name:['',Validators.required],
      email_id:['',Validators.required],
      password:['',Validators.required],
      class_id:['',Validators.required],
      type:['',Validators.required]
    });
  }

  getClasses() {
    this.classService.readClass().subscribe((response: any) => {
     this.classes = response.msg;
    });
    
  }


  getAdmins() {
  this.userService.getAdmins().subscribe((response: any) => {
    this.users = response;
  });
  }
  get f() { return this.adminUserForm.controls; }
  
  onSubmit(form: FormGroup) {
      form.patchValue({
        admission_number: 'admin',
        roll_number:'admin',
        type:'admin',
        gender:'admin'
      });
      this.userService.createUser( form.value ).subscribe((response: any) => {
        if ( response.error ) {
          M.toast({ html: response.msg , classes: 'roundeds'});
          this.getClasses();
          this.createForm();
        } else {
          M.toast({ html: response.msg , classes: 'roundeds'});
          this.getClasses();
          this.createForm();
        }
      });
    }
 
}
