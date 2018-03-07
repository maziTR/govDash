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
  @Input() chartId:string;
  constructor(private AmCharts: AmChartsService) { }

  ngOnInit() {
    console.log(this.data);
  }

  ngAfterViewInit() {
    console.log(this.data);
    this.chart = this.AmCharts.makeChart(this.chartId, this.data);
    console.log(this.chart);
  }

    ngOnDestroy() {
      if (this.chart) {
        this.AmCharts.destroyChart(this.chart);
      }
    }
}


