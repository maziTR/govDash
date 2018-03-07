import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, AfterViewInit{
  private chart: AmChart;
  @Input() data;

  constructor(private AmCharts: AmChartsService) { }

  ngOnInit() {
    console.log(this.data);
  }

  ngAfterViewInit() {
    console.log(this.data);
    this.chart = this.AmCharts.makeChart("chartdiv", this.data);
    console.log(this.chart);
  }

}


