import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TablesService } from '../tables.service';

@Component({
  selector: 'app-blockers-dashboard',
  templateUrl: './blockers-dashboard.component.html',
  styleUrls: ['./blockers-dashboard.component.css']
})
export class BlockersDashboardComponent implements OnInit {

  chart1:any;
  chart2:any;

  constructor(private tableService: TablesService) { }

  ngOnInit() {
    this.tableService.getTables().subscribe(
      data => {
        this.chart1 = this.tableService.generateChart(data, [[3, 72], [3, 91], [3, 106]], "חסמים - המשאב העיקרי שהיה חסר לפרויקט כדי להתקדם כמתוכנן - חלוקה לתחומי על");
        this.chart2 = this.tableService.generateChart(data, [[3, 74], [3, 92], [3, 107]], "חסמים - ממשק מרכזי שהקשה על הביצוע - בחלוקה לתחומי על");
      }
    );

  }
  
}
