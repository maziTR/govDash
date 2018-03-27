import { Component, OnInit, AfterViewInit, OnDestroy, Input, OnChanges  } from '@angular/core';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent implements AfterViewInit, OnChanges {
  private chart: AmChart;
  @Input() data;
  @Input() chartId: string;

  constructor(private AmCharts: AmChartsService) { }

  ngOnChanges() {
    this.chart = this.AmCharts.makeChart(this.chartId, this.data);
  }

  ngAfterViewInit(){
    this.chart = this.AmCharts.makeChart(this.chartId, this.data);
  }
  
  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }
}