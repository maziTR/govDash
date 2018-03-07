import { Component, OnInit } from '@angular/core';
import { TablesService } from '../tables.service';

@Component({
  selector: 'app-execution-dashboard',
  templateUrl: './execution-dashboard.component.html',
  styleUrls: ['./execution-dashboard.component.css']
})
export class ExecutionDashboardComponent implements OnInit {
  chart1:{};
  chart2:Array<any>;
  chartIds: any[];

  constructor(private tableService: TablesService) { }

  ngOnInit() {
    this.tableService.getTables().subscribe(
      data => {
        // this.chart1 = this.tableService.blockersChart(data,3,105,"chart1div");
        this.chart1 = this.tableService.blockersChart(data, [[3, 105]],"chart1div");
      }
    )
  }
}
