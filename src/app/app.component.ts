import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  files: any[] = [];
  sheets: any[] = [];
  inputText: string;

  constructor(public userService: UserService, public router: Router) { }
  
  ngOnInit() {
  }
}