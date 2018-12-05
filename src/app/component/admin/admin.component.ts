import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
