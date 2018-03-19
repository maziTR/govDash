import { Component, OnInit, AfterViewInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements AfterViewInit, OnChanges {
  private chart: AmChart;
  @Input() data;
  @Input() chartId: string;
  constructor(private AmCharts: AmChartsService) { }

  ngAfterViewInit() {
    this.chart = this.AmCharts.makeChart(this.chartId, this.data);
  }

  ngOnChanges() {
    this.chart = this.AmCharts.makeChart(this.chartId, this.data);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }
}


