import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  private chart: AmChart;

  constructor(private AmCharts: AmChartsService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.chart = this.AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "theme": "light",
      "legend": {
        "autoMargins": false,
        "borderAlpha": 0.2,
        "equalWidths": false,
        "horizontalGap": 10,
        "markerSize": 10,
        "useGraphSettings": true,
        "valueAlign": "left",
        "valueWidth": 0
      },
      "dataProvider": [{
        "year": "2003",
        "europe": 2.5,
        "namerica": 2.5,
        "asia": 2.1,
        "lamerica": 0.3,
        "meast": 0.2,
        "africa": 0.1
      }, {
        "year": "2004",
        "europe": 2.6,
        "namerica": 2.7,
        "asia": 2.2,
        "lamerica": 0.3,
        "meast": 0.3,
        "africa": 0.1
      }, {
        "year": "2005",
        "europe": 2.8,
        "namerica": 2.9,
        "asia": 2.4,
        "lamerica": 0.3,
        "meast": 0.3,
        "africa": 0.1
      }],
      "valueAxes": [{
        "id": "v1",
        "stackType": "100%",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "labelsEnabled": false,
        "position": "left"
      }, {
        "id": "v2",
        "stackType": "100%",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "labelsEnabled": false,
        "position": "left"
      }],
      "graphs": [{
        "valueAxis": "v1",
        "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
        "fillAlphas": 0.9,
        "fontSize": 11,
        "labelText": "[[percents]]%",
        "lineAlpha": 0.5,
        "title": "Europe",
        "type": "column",
        "valueField": "europe"
      }, {
        "valueAxis": "v1",
        "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
        "fillAlphas": 0.9,
        "fontSize": 11,
        "labelText": "[[percents]]%",
        "lineAlpha": 0.5,
        "title": "North America",
        "type": "column",
        "valueField": "namerica"
      }, {
        "valueAxis": "v1",
        "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
        "fillAlphas": 0.9,
        "fontSize": 11,
        "labelText": "[[percents]]%",
        "lineAlpha": 0.5,
        "title": "Asia-Pacific",
        "type": "column",
        "valueField": "asia"
      }
        // }, {
        //   "valueAxis": "v2",
        //   "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
        //   "fillAlphas": 0.9,
        //   "fontSize": 11,
        //   "labelText": "[[percents]]%",
        //   "lineAlpha": 0.5,
        //   "title": "Latin America",
        //   "type": "column",
        //   "valueField": "lamerica"
        // }, {
        //   "valueAxis": "v2",
        //   "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
        //   "fillAlphas": 0.9,
        //   "fontSize": 11,
        //   "labelText": "[[percents]]%",
        //   "lineAlpha": 0.5,
        //   "title": "Middle-East",
        //   "type": "column",
        //   "valueField": "meast"
        // }, {
        //   "valueAxis": "v2",
        //   "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
        //   "fillAlphas": 0.9,
        //   "fontSize": 11,
        //   "labelText": "[[percents]]%",
        //   "lineAlpha": 0.5,
        //   "title": "Africa",
        //   "type": "column",
        //   "valueField": "africa"
        // }],
      ],
      "marginTop": 30,
      "marginRight": 0,
      "marginLeft": 0,
      "marginBottom": 40,
      "autoMargins": false,
      "categoryField": "year",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "gridAlpha": 0
      }
    });

  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }

}
