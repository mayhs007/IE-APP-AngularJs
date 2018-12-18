import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from '../../app/app.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly baseUrl = 'users/';
  constructor(private http: HttpClient, private app: AppService) { }

  getAdmins() {
    console.log('service');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.app.getUrl(this.baseUrl + 'admins' ));
  }
}
