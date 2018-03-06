import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TablesService {

  constructor(private http: HttpClient) { }

  getFiles(): Observable<any> {
    return this.http.get<any>('/api/data');
  }

  getTables(id: string): Observable<any> {
    return this.http.get<any>('/api/data/' + id);
  }

  blockersChart1(data) {
    
    return [{arr: 'aaa', raa:'eee'}] 
  }

  blockersChart2() {
    return
  }
  executionChart1() {
    return
  }
  executionChart2() {
    return
  }
  executionChart3() {
    return
  }
  executionChart4() {
    return
  }
}