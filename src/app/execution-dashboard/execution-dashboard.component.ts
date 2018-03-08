import { Component, OnInit } from '@angular/core';
import { TablesService } from '../tables.service';

@Component({
  selector: 'app-execution-dashboard',
  templateUrl: './execution-dashboard.component.html',
  styleUrls: ['./execution-dashboard.component.css', '../loader.css']
})
export class ExecutionDashboardComponent implements OnInit {
  chart1:any;
  chart2:any;
  chart3:any;

  constructor(private tableService: TablesService) { }

  ngOnInit() {
  this.tableService.getTables().subscribe(
    data => {
      this.chart1 = this.tableService.generateChart(data, [[3, 105]], "סטטוס הביצוע בחלוקה לתחומי על - כלל המשימות");
      this.chart2 = this.tableService.generateChart(data, [[19, 105]], "סטטוס ביצוע בהתאם לתועלת הציבורית מהמשימה  - כלל המשימות");
      this.chart3 = this.tableService.generateChart(data, [[24, 105]], "סטטוס ביצוע בהתאם לישימות המשימה - כלל המשימות");
    }
  );
  }
}
