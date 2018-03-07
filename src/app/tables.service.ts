import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

@Injectable()
export class TablesService {
  private rawData:any[];

  constructor(private http: HttpClient, private AmCharts: AmChartsService) { }

  getTables(): Observable<any> {
    return this.http.get<any>('/api/data');
  }

  updateTables(){
    this.getTables().subscribe(
      data => this.rawData = data
    )
  }

  blockersChart(data: any[], clm1: number, clm2: number) {

    let sheet = data[0];
    let output_array: any[] = [];
    let graphArray: any[];
    let field_count = {};
    let field_chart = [];

    for (var i = 1; i < sheet.length; i++) {
      var field = sheet[i][clm1];
      var status = sheet[i][clm2];
      if (status) {
        if (field_count[field]) {
          if (field_count[field][status]) {
            field_count[field][status]++
          }
          else {
            field_count[field][status] = 1;
          }

        } else {
          field_count[field] = {};
          field_count[field][status] = 1
        }
      }
      // return field_count
    }
    console.log(field_count[field]);
   // console.log(Object.keys(field_count[field]))
    field_chart= Object.keys(field_count[field]); /////
    console.log(field_count);

    for (let name in field_count) {
      var graph_object = { field: name };
      var task_details = field_count[name];
      for (status in task_details) {
        graph_object[status] = task_details[status];
        
      }
      output_array.push(graph_object);
    }
    output_array.unshift(output_array.pop())
    // this.data = [{"field":"בריאות",
    // "5. בוטל":17,
    // "1. בוצע כמתוכנן במקור":15,
    // "4. מתעכב מול תכנון מקורי":35,
    // "2. בוצע עם שינוי תכולה (מהות ו/או זמן)":12,
    // "3. יבוצע בהמשך, בהתאם לתכנון המקורי":12}]
    field_chart.pop()
    graphArray = this._generateGraphArr(field_chart);

    return this.outputChart(output_array, graphArray);
  }

  _generateGraphArr(statuses:any[]){
    console.log(statuses)
    let returnVal:any[] = [];
    const colors = ['#00BA54','#73D94F','#F8FF00','#FFC200','#FF0000'];

    for (let i=0; i<statuses.length; i++){
      let currJsonObj = {
        "valueAxis": "v1",
        "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
        "fillAlphas": 0.9,
        "fontSize": 11,
        "labelText": "[[percents]]%",
        "lineAlpha": 0.5,
        "title": "",
        "type": "column",
        "valueField": "",
        "fillColors": ""
      }
      
      currJsonObj.title = statuses[i];
      currJsonObj.valueField = statuses[i];
      currJsonObj.fillColors = colors[i];
      returnVal.push(currJsonObj);
      console.log(currJsonObj);
    }
    return returnVal;
  }

  outputChart(dataProviderArr: any[], dataGraphArr: any[]) {
    console.log('graphs:'+ dataGraphArr[0])
    // this.data = this.ngOnInit()
    var chart = this.AmCharts.makeChart("chartdiv", {
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
      "dataProvider": dataProviderArr,
      "valueAxes": [{
        "id": "v1",
        "stackType": "100%",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "labelsEnabled": false,
        "position": "left"
      }],
      "graphs": dataGraphArr,
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

  //   [ 
  //     {
  //       "valueAxis": "v1",
  //       "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
  //       "fillAlphas": 0.9,
  //       "fontSize": 11,
  //       "labelText": "[[percents]]%",
  //       "lineAlpha": 0.5,
  //       "title": "1. בוצע כמתוכנן במקור",
  //       "type": "column",
  //       "valueField": "1. בוצע כמתוכנן במקור",
  //       "fillColors": "#00BA54"
  //     },
  //     {
  //     "valueAxis": "v1",
  //     "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
  //     "fillAlphas": 0.9,
  //     "fontSize": 11,
  //     "labelText": "[[percents]]%",
  //     "lineAlpha": 0.5,
  //     "title": "2. בוצע עם שינוי תכולה (מהות ו/או זמן)",
  //     "type": "column",
  //     "valueField": "2. בוצע עם שינוי תכולה (מהות ו/או זמן)",
  //     "fillColors": "#73D94F"
  //   }, {
  //     "valueAxis": "v1",
  //     "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
  //     "fillAlphas": 0.9,
  //     "fontSize": 11,
  //     "labelText": "[[percents]]%",
  //     "lineAlpha": 0.5,
  //     "title": "3. יבוצע בהמשך, בהתאם לתכנון המקורי",
  //     "type": "column",
  //     "valueField": "3. יבוצע בהמשך, בהתאם לתכנון המקורי",
  //     "fillColors": "#F8FF00"

  //   },
  //   {
  //     "valueAxis": "v1",
  //     "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
  //     "fillAlphas": 0.9,
  //     "fontSize": 11,
  //     "labelText": "[[percents]]%",
  //     "lineAlpha": 0.5,
  //     "title": "4. מתעכב מול תכנון מקורי",
  //     "type": "column",
  //     "valueField": "4. מתעכב מול תכנון מקורי",
  //     "fillColors": "#FFC200"

  //   },
  //   {
  //     "valueAxis": "v1",
  //     "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
  //     "fillAlphas": 0.9,
  //     "fontSize": 11,
  //     "labelText": "[[percents]]%",
  //     "lineAlpha": 0.5,
  //     "title": "5. בוטל",
  //     "type": "column",
  //     "valueField": "5. בוטל",
  //     "fillColors": "#FF0000"
  //   }
  // ]

    // ngOnDestroy() {
    //   if (this.chart) {
    //     this.AmCharts.destroyChart(this.chart);
    //   }
    // }

    return chart
  }

  blockersChart2() {
    return
  }
  executionChart1() {
    return
  }
  executionChart2() {
    return
  }
  executionChart3() {
    return
  }
  executionChart4() {
    return
  }
}