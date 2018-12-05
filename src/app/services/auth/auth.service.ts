import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from '../app/app.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient, private app: AppService , private jwtHelper: JwtHelper, private router: Router) { }
  private initHeaders() {
    const headers = new Headers();
    // Set authorization headers
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  authenticate(email_id: string, password: string) {
    const body = { email_id: email_id, password: password };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.app.getUrl('users/authenticate'), body).pipe(map(res => res, {'headers': headers}));
  }
  createSession(response) {
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', response.token);
  }
  destroySession() {
    localStorage.clear();
  }
  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      if (this.jwtHelper.isTokenExpired(token)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  getCurrentUser()  {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    return this.http.get(this.app.getUrl('users/profile'), httpOptions).pipe(map(res => res));
  }
  getCurrentUserId() {
    if (this.isLoggedIn()) {
      const user = localStorage.getItem('user');
      return JSON.parse(user).id;
    } else {
      return false;
    }
  }
  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }
  getUserType() {
    if (this.isLoggedIn()) {
      const user = localStorage.getItem('user');
      return JSON.parse(user).type;
    } else {
      return false;
    }
  }
  isAdmin() {
    if ( this.isLoggedIn() ) {
      const user = localStorage.getItem('user');
      const type = JSON.parse(user).type;
      if (type === 'admin') {
        return true;
      } else {
        return false;
      }
    }
  }


}
