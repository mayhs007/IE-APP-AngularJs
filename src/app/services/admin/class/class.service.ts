import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from '../../app/app.service';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  readonly baseUrl = 'class/';
  constructor(private http: HttpClient, private app: AppService) { }
  createClass (values ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.app.getUrl(this.baseUrl + 'create'), values).pipe(map(res => res, {'headers': headers}));
  }
  readClass() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.app.getUrl(this.baseUrl));
  }
  updateClass(id: String, name: String) {
    const body = { _id: id , name: name };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.app.getUrl(this.baseUrl + `${id}`), body).pipe(map(res => res, {'headers': headers}));
  }
  deleteClass(id: String) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.app.getUrl(this.baseUrl + `${id}` ) ).pipe(map(res => res, {'headers': headers}));
  }
  readAdminClass() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.app.getUrl(this.baseUrl+ 'admin'));
  }
}
