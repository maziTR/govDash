import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { TablesService } from '../tables.service';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  private chart: AmChart;

  // TODO - change to input once dynamic
  // @Input() data: any[];
  data: any[];
  sheets: any[];

  constructor(private AmCharts: AmChartsService, private tableService: TablesService) { }

  ngOnInit() {
    this.tableService.getTables().subscribe(data => {
      this.sheets = data;
      var sheet = this.sheets[0];

   

      // console.log(sheet)
      var field_count = {};

      for (var i = 1; i < sheet.length; i++) {
        var field = sheet[i][3];
        var status = sheet[i][105];
        //  console.log(sheet[i][82])


        if (status) {
          if (field_count[field]) {
            if (field_count[field][status]) {
              field_count[field][status]++;
            } else {
              field_count[field][status] = 1;
            }
          } else {
            field_count[field] = {};
            field_count[field][status] = 1;
          }
        }
      }
      console.log(field_count)


      var output_array = [];
      console.log(output_array)
      var field_chart = [];

      for (var name in field_count) {
        var graph_object = { field: name };
        var task_details = field_count[name];
        for (status in task_details) {
          graph_object[status] = task_details[status]
        }
        output_array.push(graph_object)
        field_chart.push(status)
      }
      output_array.unshift(output_array.pop());
      this.data = output_array;
      // this.data = [{"field":"בריאות",
      // "5. בוטל":17,
      // "1. בוצע כמתוכנן במקור":15,
      // "4. מתעכב מול תכנון מקורי":35,
      // "2. בוצע עם שינוי תכולה (מהות ו/או זמן)":12,
      // "3. יבוצע בהמשך, בהתאם לתכנון המקורי":12}]
      this.ngAfterViewInit();
      

    })
  }

  ngAfterViewInit() {
    this.chart = this.AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "theme": "light",
      "legend": {
        "autoMargins": false,
        "borderAlpha": 0.2,
        "equalWidths": false,
        "horizontalGap": 40,
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
      }],
      "graphs": [
        {
          "valueAxis": "v1",
          "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
          "fillAlphas": 0.9,
          "fontSize": 11,
          "labelText": "[[percents]]%",
          "lineAlpha": 0.5,
          "title": "1. בוצע כמתוכנן במקור",
          "type": "column",
          "valueField": "1. בוצע כמתוכנן במקור",
          "fillColors": "#00BA54"
        }, {
          "valueAxis": "v1",
          "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
          "fillAlphas": 0.9,
          "fontSize": 11,
          "labelText": "[[percents]]%",
          "lineAlpha": 0.5,
          "title": "2. בוצע עם שינוי תכולה (מהות ו/או זמן)",
          "type": "column",
          "valueField": "2. בוצע עם שינוי תכולה (מהות ו/או זמן)",
          "fillColors": "#73D94F"
        }, {
          "valueAxis": "v1",
          "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
          "fillAlphas": 0.9,
          "fontSize": 11,
          "labelText": "[[percents]]%",
          "lineAlpha": 0.5,
          "title": "3. יבוצע בהמשך, בהתאם לתכנון המקורי",
          "type": "column",
          "valueField": "3. יבוצע בהמשך, בהתאם לתכנון המקורי",
          "fillColors": "#F8FF00"

        },
        {
          "valueAxis": "v1",
          "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
          "fillAlphas": 0.9,
          "fontSize": 11,
          "labelText": "[[percents]]%",
          "lineAlpha": 0.5,
          "title": "4. מתעכב מול תכנון מקורי",
          "type": "column",
          "valueField": "4. מתעכב מול תכנון מקורי",
          "fillColors": "#FFC200"

        },
        {
          "valueAxis": "v1",
          "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
          "fillAlphas": 0.9,
          "fontSize": 11,
          "labelText": "[[percents]]%",
          "lineAlpha": 0.5,
          "title": "5. בוטל",
          "type": "column",
          "valueField": "5. בוטל",
          "fillColors": "#FF0000"
        }
      ],
      "marginTop": 30,
      "marginRight": 0,
      "marginLeft": 0,
      "marginBottom": 40,
      "autoMargins": false,
      "categoryField": "field",
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


