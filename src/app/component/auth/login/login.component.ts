import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  loginForm: FormGroup;
  error: false;
  errors: string[];
  email_text: boolean;
  password_text: boolean;
  Button: any;
  ngOnInit() {
    this.Button = 'Login';
    this.loginForm = new FormGroup({
      'email_id': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }
  get email_id() {
    return this.loginForm.get('email_id');
  }
  get password() {
    return this.loginForm.get('password');
  }
  onSubmit() {
    this.Button = 'Checking...';
    const email_id = this.loginForm.value.email_id;
    const password = this.loginForm.value.password;
    this.authService.authenticate(email_id, password).subscribe((response: any) => {
      if (response.success) {
          if (response.user.type === 'student') {
            this.router.navigate(['/user/home']);
          } else {
            this.router.navigate(['/admin/home']);
          }
            this.authService.createSession(response);
      } else {
        // Create session for the user
        M.toast({ html: response.msg, classes: 'rounded' });
        this.loginForm.reset();
      }
    });
  }

}
