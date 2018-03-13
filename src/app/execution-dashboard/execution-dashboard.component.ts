import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../charts.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-execution-dashboard',
  templateUrl: './execution-dashboard.component.html',
  styleUrls: ['./execution-dashboard.component.css', '../loader.css']
})
export class ExecutionDashboardComponent implements OnInit {
  chart: any;
  user: {name: string};
  filterOptions: Array<{column: number, optionName: string}>;
  selected: number;
  sheetsArray: any[];

  constructor(private chartsService: ChartsService, private userService: UserService) { }

  ngOnInit() {
    let options = ['תחום-על', 'סגן מוביל במטה', 'התועלת הציבורית מהמשימה', 'ישימות המשימה באחוזים', 
      'מעורבות מנכ"ל שוויון חברתי'];
    this.user = {name: ""};

    this.chartsService.getTables().subscribe(
      data => {
        this.sheetsArray = data;
        this.filterOptions = this.chartsService.createFilter(data, options);
        this.selected = 0;
        this.chart = this.chartsService.generateChart(data, [[this.filterOptions[0].column, 105]], 
          `סטטוס הביצוע של כלל המשימות חלוקה לפי ${this.filterOptions[0].optionName}`);
      }
    );

    this.userService.getUserRequest().subscribe(data => {
      this.user = data;
      this.userService.setUser(this.user);
    });
  }

  updateChart() {
    let selectedOption = this.filterOptions[this.selected];
    this.chart = this.chartsService.generateChart(this.sheetsArray, [[selectedOption.column, 105]], 
          `סטטוס הביצוע של כלל המשימות - לפי ${selectedOption.optionName}`);
  }
}