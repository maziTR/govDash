import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ChartsService } from '../charts.service';

@Component({
  selector: 'execution-dashboard',
  templateUrl: './execution-dashboard.component.html',
  styleUrls: ['./execution-dashboard.component.css', '../loader.css']
})
export class ExecutionDashboardComponent implements OnInit, OnChanges {
  @Input() sheetsArray: any[];
  chart: any;
  filterOptions: Array<{ column: number, optionName: string }>;
  selected: number;
  pie1:any;
  pie2:any;
  
  constructor(private chartsService: ChartsService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    let options = ['תחום-על', 'סגן מוביל במטה', 'התועלת הציבורית מהמשימה', 'ישימות המשימה באחוזים',
      'מעורבות מנכ"ל שוויון חברתי'];
    if (this.sheetsArray) {
      this.filterOptions = this.chartsService.createFilter(this.sheetsArray, options);
      this.selected = 0;
      this.chart = this.chartsService.generateChart(this.sheetsArray, [[this.filterOptions[0].column, 105]],
        `סטטוס הביצוע של כלל המשימות - לפי ${this.filterOptions[0].optionName}`);
      this.pie1 = this.chartsService.generatePie(this.sheetsArray, 105, "סטטוס הביצוע של כלל המשימות - סטטוס שנתי מטויב קצר");
      this.pie2 = this.chartsService.generatePie(this.sheetsArray, 104, "סטטוס הביצוע של כלל המשימות - סטטוס שנתי מטויב ארוך");
      }
  }

  updateChart() {
    let selectedOption = this.filterOptions[this.selected];
    this.chart = this.chartsService.generateChart(this.sheetsArray, [[selectedOption.column, 105]],
      `סטטוס הביצוע של כלל המשימות - לפי ${selectedOption.optionName}`);
  }
}