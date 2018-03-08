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
  chart1Title: string;
  chart2Title: string;
  constructor(private tableService: TablesService) { }

  ngOnInit() {
  this.chart1Title = "סטטוס הביצוע בחלוקה לתחומי על - כלל המשימות";
  this.chart2Title = "סטטוס הביצוע בחלוקה לתחומי על - כלל המשימות";
    this.tableService.getTables().subscribe(
      data => {
        this.chart1 = this.tableService.generateChart(data, [[3, 105], [3, 105], [3, 105]], this.chart1Title);
        this.chart2 = this.tableService.generateChart(data, [[3, 105], [3, 105], [3, 105]], this.chart2Title);
      }
    );
  }
  aClicked(e){
    e.preventDefault();
  }
}
