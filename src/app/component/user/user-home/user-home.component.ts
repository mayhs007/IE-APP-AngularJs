import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../model/user';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UsersHomeComponent implements OnInit {
  user: User = new User();
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((res: any) => {
      this.user = res.profile;
    },
     err => {
       console.log(err);
       return false;
     });

  }

}
