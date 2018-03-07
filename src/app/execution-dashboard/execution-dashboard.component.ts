import { Component, OnInit } from '@angular/core';
import { TablesService } from '../tables.service';

@Component({
  selector: 'app-execution-dashboard',
  templateUrl: './execution-dashboard.component.html',
  styleUrls: ['./execution-dashboard.component.css']
})
export class ExecutionDashboardComponent implements OnInit {
  chart1:any;
  chart2:any;
  chart3:any;
  chart4:any;

  constructor(private tableService: TablesService) { }

  ngOnInit() {
  this.tableService.getTables().subscribe(
    data => {
      this.chart1 = this.tableService.blockersChart(data,3,105);
      this.chart2 = this.tableService.blockersChart(data,3,105);
      this.chart3 = this.tableService.blockersChart(data,3,105);
      this.chart4 = this.tableService.blockersChart(data,3,105);
    }
  );
  }
}
