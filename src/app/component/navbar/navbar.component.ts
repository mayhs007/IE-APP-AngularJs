import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User = new User();
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if ( this.authService.isLoggedIn()) {
      this.authService.getCurrentUser().subscribe((res: any) => {
        this.user = res.profile;
      },
       err => {
         console.log(err);
         return false;
       });
    }
  }
  onLogoutClick() {
   this.authService.destroySession();
   this.router.navigate(['/auth/login']);
  }

}
