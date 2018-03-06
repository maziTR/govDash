import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { ChartsCalculationsService } from '../charts-calculations.service';
import { TablesService } from '../tables.service';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  private chart: AmChart;
  data:any;
  sheets:any[];

  constructor(private AmCharts: AmChartsService,
              private test: ChartsCalculationsService,
              private tableService: TablesService) { }

  ngOnInit() {
    // ::this.test.getSheets();
    this.tableService.getTables().subscribe(data => {
      this.sheets = data; 
      var sheet = this.sheets[0]
      console.log(this.sheets)

      var field_count = {};

      // var field_array = [];
      // var chart_array = [];
      for (var i=1; i<sheet.length; i++){    
        var field = sheet[i][3];
        var status = sheet[i][105];
        if (status) {
          if(field_count[field]) {
            if (field_count[field][status]) {
              field_count[field][status]++
            }
            else {
              field_count[field][status]=1; 
            }

          }else{
            field_count[field] = {};
            field_count[field][status] = 1
          }
        }

        // return field_count
      }
      console.log(field_count[field])

      console.log(field_count);
      var output_array = [];

      for(var name in field_count){ 

      var graph_object ={field: name};
        var task_details = field_count[name]; 
        for (status in task_details){
         graph_object[status] = task_details[status]
        }
        output_array.push(graph_object)
      }
      output_array.unshift(output_array.pop())
      this.data = JSON.stringify(output_array)
      console.log(this.data)


    })
  }

  ngAfterViewInit() {
    // this.data = this.ngOnInit()
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
      "dataProvider": this.data,
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
