import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient) {}
  
  //getting 
  login(user:{}) : Observable<any> {
    return this.http.post('/form', user);
  }

  // store, a JS object as JSON string, in local storage under the key "crmUser"
  setLocalStorage(token){
    localStorage.setItem('crmUser', JSON.stringify(token));
  }

  // get our user from local storage and convert it back to a JS Object
  fetchUserDetails(){
    const token = JSON.parse(localStorage.getItem('crmUser'));
      return this.http.post('/userDetails', token);
  }

}
