import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../charts.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-execution-dashboard',
  templateUrl: './execution-dashboard.component.html',
  styleUrls: ['./execution-dashboard.component.css', '../loader.css']
})
export class ExecutionDashboardComponent implements OnInit {
  chart1: any;
  chart2: any;
  chart3: any;
  user: {name: string};

  constructor(private chartsService: ChartsService, private userService: UserService) { }

  ngOnInit() {
    this.user = {name: ""};
    this.chartsService.getTables().subscribe(
      data => {
        this.chart1 = this.chartsService.generateChart(data, [[3, 105]], "סטטוס הביצוע בחלוקה לתחומי על - כלל המשימות");
        this.chart2 = this.chartsService.generateChart(data, [[19, 105]], "סטטוס ביצוע בהתאם לתועלת הציבורית מהמשימה  - כלל המשימות");
        this.chart3 = this.chartsService.generateChart(data, [[24, 105]], "סטטוס ביצוע בהתאם לישימות המשימה - כלל המשימות");
      }
    );

    this.userService.getUserRequest().subscribe(data => {
      this.user = data;
      this.userService.setUser(this.user);
    });
  }
}
