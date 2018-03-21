import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../charts.service';
import { UserService } from '../user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sheetsArray: any[];
  user: {name: string};

  constructor(private chartsService: ChartsService, private userService: UserService) { }

  ngOnInit() {
    this.chartsService.getTablesRequest().subscribe(data => {
        this.sheetsArray = data;
        this.chartsService.setTables(this.sheetsArray);
      });
    this.user = {name: ""};

    this.userService.getUserRequest().subscribe(data => {
      this.user = data;
      this.userService.setUser(this.user);
    });
  }
}