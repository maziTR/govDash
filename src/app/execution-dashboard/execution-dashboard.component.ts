import { Component, OnInit } from '@angular/core';
import { TablesService } from '../tables.service';

@Component({
  selector: 'app-execution-dashboard',
  templateUrl: './execution-dashboard.component.html',
  styleUrls: ['./execution-dashboard.component.css']
})
export class ExecutionDashboardComponent implements OnInit {
  sheets: any[];

  constructor(private tablesService: TablesService) { }

  ngOnInit() {
    this.tablesService.getTables().subscribe(data => this.sheets = data);
  }
}
