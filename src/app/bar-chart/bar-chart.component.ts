import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { TablesService } from '../tables.service';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, AfterViewInit{
  private chart: AmChart;

  // TODO - change to input once dynamic
  // @Input() data: any[];
  data: any[];
  sheets: any[];

  constructor(private AmCharts: AmChartsService, private tableService: TablesService) { }

  ngOnInit() {
   // console.log(this.data);
  }

  ngAfterViewInit() {
    this.chart = this.AmCharts.makeChart("chartdiv", this.data);
  }

}