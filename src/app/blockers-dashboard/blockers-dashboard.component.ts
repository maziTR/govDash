import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TablesService } from '../tables.service';

@Component({
  selector: 'app-blockers-dashboard',
  templateUrl: './blockers-dashboard.component.html',
  styleUrls: ['./blockers-dashboard.component.css']
})
export class BlockersDashboardComponent implements OnInit {

  chart1;
  chart2:Array<any>;

  constructor(private tableService: TablesService) { }

  ngOnInit() {
  
    this.tableService.getTables().subscribe(
      data => {
        console.log(data);
        this.chart1 = this.tableService.blockersChart(data,3,105);
      }
    );
  }
  
}
