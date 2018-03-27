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
  pie1: any;
  pie2: any;
  shortExecutionStatusCol: number;
  longExecutionStatusCol: number;
  
  constructor(private chartsService: ChartsService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.sheetsArray) {
      // name of columns for execution bar chart filter (x axis) are entered here
      let options = ['תחום-על', 'סגן מוביל במטה', 'התועלת הציבורית מהמשימה', 'ישימות המשימה באחוזים',
      'מעורבות מנכ"ל שוויון חברתי'];
      
      this.filterOptions = this.chartsService.findColumnNumByName(options);
      this.selected = 0;

      // name of y axis of execution bar chart and pie charts is entered here - currently calculating yearly status
      // of execution (short for bar chart and short & long for pie charts)
      this.shortExecutionStatusCol = this.chartsService.findColumnNumByName(['סטטוס ביצוע שנתי מטויב (קצר)'])[0].column;
      this.longExecutionStatusCol = this.chartsService.findColumnNumByName(['סטטוס ביצוע שנתי מטויב (ארוך)'])[0].column;
      
      this.chart = this.chartsService.generateBarChart(this.sheetsArray, [[this.filterOptions[0].column, 
        this.shortExecutionStatusCol]], `סטטוס הביצוע של כלל המשימות - לפי ${this.filterOptions[0].optionName}`);
      
      this.pie1 = this.chartsService.generatePie(this.sheetsArray, this.shortExecutionStatusCol, 
        "סטטוס הביצוע של כלל המשימות - סטטוס שנתי מטויב קצר");
      this.pie2 = this.chartsService.generatePie(this.sheetsArray, this.longExecutionStatusCol, 
        "סטטוס הביצוע של כלל המשימות - סטטוס שנתי מטויב ארוך");
      }
  }

  updateChart() {
    let selectedOption = this.filterOptions[this.selected];
    this.chart = this.chartsService.generateBarChart(this.sheetsArray, [[selectedOption.column, this.shortExecutionStatusCol]],
      `סטטוס הביצוע של כלל המשימות - לפי ${selectedOption.optionName}`);
  }
}