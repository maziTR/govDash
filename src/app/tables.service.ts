import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TablesService {

  constructor(private http: HttpClient) { }
  
  getTables(): Observable<any> {
    return this.http.get<any>('/api/data');
  }

}