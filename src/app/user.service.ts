import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  user: any;

  constructor(private http: HttpClient) { }

  getUserRequest(): Observable<any> {
    return this.http.get<any>('/api/userDetails');
  }

  getUser() {
    return this.user;
  }

  setUser(user) {
    this.user = user;
  }
}
