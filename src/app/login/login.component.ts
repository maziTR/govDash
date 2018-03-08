import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIn: boolean;
  @Output() onButtonClick: EventEmitter<any> = new EventEmitter();

  constructor(public router: Router) { }

  ngOnInit() {
    this.loggedIn = false;
  }

  handleClick() {
    this.loggedIn = true;
    this.onButtonClick.emit(this.loggedIn);
  }
}