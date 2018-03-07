import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

@Injectable()
export class TablesService {

  constructor(private http: HttpClient, private AmCharts: AmChartsService) { }

  getTables(): Observable<any> {
    return this.http.get<any>('/api/data');
  }

  createObjectFromArray(sheet, columns) {
    let groupedObject = {};
    for (var i = 1; i < sheet.length; i++) {
      var field = sheet[i][columns[0]];
      var status = sheet[i][columns[1]];
      if (status) {
        if (groupedObject[field]) {
          if (groupedObject[field][status]) {
            groupedObject[field][status]++;
          }
          else {
            groupedObject[field][status] = 1;
          }
        } else {
          groupedObject[field] = {};
          groupedObject[field][status] = 1;
        }
      }
    }
    console.log("My grouped object:");
    console.log(groupedObject);
    return groupedObject;
  }

  sumFieldCountObjects(array) {
    let object = array[0];
    for (let i = 1; i < array.length; i++) {
      let otherObject = array[i];
      for (let element in object) {
        
      }
    }
  }


  blockersChart(data: any[], columns: any[], id: string) {
    let sheet = data[0];
    let fieldCount = [];
    let fieldChart = [];
    let outputArray: any[];
    let graphArray: any[];

    for (let i = 0; i < columns.length; i++) {
      fieldCount.push(this.createObjectFromArray(sheet, columns[i]));
    }

    // check if we need to calculate more than 2 columns
    if (fieldCount.length > 1) {
      fieldCount = sumFieldCountObjects(fieldCount);
    }
    
    console.log(fieldCount);

    for (let name in fieldCount) {
      let graphObject = { field: name };
      let taskDetails = fieldCount[name];
      for (status in taskDetails) {
        graphObject[status] = taskDetails[status]
      }
      outputArray.push(graphObject);
      fieldChart.push(status);
    }
    outputArray.unshift(outputArray.pop())
    // this.data = [{"field":"בריאות",
    // "5. בוטל":17,
    // "1. בוצע כמתוכנן במקור":15,
    // "4. מתעכב מול תכנון מקורי":35,
    // "2. בוצע עם שינוי תכולה (מהות ו/או זמן)":12,
    // "3. יבוצע בהמשך, בהתאם לתכנון המקורי":12}]
    graphArray = this._generateGraphArr(fieldChart);

    return this.outputChart(outputArray, graphArray);
  }

  _generateGraphArr(statuses: string[]) {
    let returnVal: any[] = [];
    const colors = ['#00BA54', '#73D94F', '#F8FF00', '#FFC200', '#FF0000'];
    const charts_format = {
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
    };

    for (let i = 0; i < statuses.length; i++) {
      let currJsonObj = charts_format;
      currJsonObj["title"] = statuses[i];
      currJsonObj["valueField"] = statuses[i];
      currJsonObj["fillColors"] = colors[i];
      returnVal.push(currJsonObj);
    }
    return returnVal;
  }

  outputChart(dataProviderArr: any[], dataGraphArr: any[]) {
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
      "graphs": [{
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
      }
        , {
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
      ]
      ,
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



    // ngOnDestroy() {
    //   if (this.chart) {
    //     this.AmCharts.destroyChart(this.chart);
    //   }
    // }

    return chart
  }











  // original code starts here
  // blockersChart(data: any[], clm1: number, clm2: number, id: string) {
  //   let sheet = data[0];

    
  //   let outputArray: any[];
  //   let graphArray: any[];
  //   let fieldCount = {};
  //   let fieldChart = [];
  //   for (var i = 1; i < sheet.length; i++) {
  //     var field = sheet[i][clm1];
  //     var status = sheet[i][clm2];
  //     if (status) {
  //       if (fieldCount[field]) {
  //         if (fieldCount[field][status]) {
  //           fieldCount[field][status]++;
  //         }
  //         else {
  //           fieldCount[field][status] = 1;
  //         }
  //       } else {
  //         fieldCount[field] = {};
  //         fieldCount[field][status] = 1;
  //       }
  //     }
  //   }
  //   console.log(fieldCount);

  //   for (let name in fieldCount) {
  //     let graphObject = { field: name };
  //     let taskDetails = fieldCount[name];
  //     for (status in taskDetails) {
  //       graphObject[status] = taskDetails[status]
  //     }
  //     outputArray.push(graphObject);
  //     fieldChart.push(status);
  //   }
  //   outputArray.unshift(outputArray.pop())
  //   // this.data = [{"field":"בריאות",
  //   // "5. בוטל":17,
  //   // "1. בוצע כמתוכנן במקור":15,
  //   // "4. מתעכב מול תכנון מקורי":35,
  //   // "2. בוצע עם שינוי תכולה (מהות ו/או זמן)":12,
  //   // "3. יבוצע בהמשך, בהתאם לתכנון המקורי":12}]
  //   graphArray = this._generateGraphArr(fieldChart);

  //   return this.outputChart(outputArray, graphArray);
  // }

  // _generateGraphArr(statuses: string[]) {
  //   let returnVal: any[] = [];
  //   const colors = ['#00BA54', '#73D94F', '#F8FF00', '#FFC200', '#FF0000'];
  //   const charts_format = {
  //     "valueAxis": "v1",
  //     "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
  //     "fillAlphas": 0.9,
  //     "fontSize": 11,
  //     "labelText": "[[percents]]%",
  //     "lineAlpha": 0.5,
  //     "title": "1. בוצע כמתוכנן במקור",
  //     "type": "column",
  //     "valueField": "1. בוצע כמתוכנן במקור",
  //     "fillColors": "#00BA54"
  //   };

  //   for (let i = 0; i < statuses.length; i++) {
  //     let currJsonObj = charts_format;
  //     currJsonObj["title"] = statuses[i];
  //     currJsonObj["valueField"] = statuses[i];
  //     currJsonObj["fillColors"] = colors[i];
  //     returnVal.push(currJsonObj);
  //   }
  //   return returnVal;
  // }

  // outputChart(dataProviderArr: any[], dataGraphArr: any[]) {
  //   // this.data = this.ngOnInit()
  //   var chart = this.AmCharts.makeChart("chartdiv", {
  //     "type": "serial",
  //     "theme": "light",
  //     "legend": {
  //       "autoMargins": false,
  //       "borderAlpha": 0.2,
  //       "equalWidths": false,
  //       "horizontalGap": 40,
  //       "markerSize": 10,
  //       "useGraphSettings": true,
  //       "valueAlign": "left",
  //       "valueWidth": 0
  //     },
  //     "dataProvider": dataProviderArr,
  //     "valueAxes": [{
  //       "id": "v1",
  //       "stackType": "100%",
  //       "axisAlpha": 0,
  //       "gridAlpha": 0,
  //       "labelsEnabled": false,
  //       "position": "left"
  //     }],
  //     "graphs": [{
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
  //     }
  //       , {
  //       "valueAxis": "v1",
  //       "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
  //       "fillAlphas": 0.9,
  //       "fontSize": 11,
  //       "labelText": "[[percents]]%",
  //       "lineAlpha": 0.5,
  //       "title": "2. בוצע עם שינוי תכולה (מהות ו/או זמן)",
  //       "type": "column",
  //       "valueField": "2. בוצע עם שינוי תכולה (מהות ו/או זמן)",
  //       "fillColors": "#73D94F"
  //     }, {
  //       "valueAxis": "v1",
  //       "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
  //       "fillAlphas": 0.9,
  //       "fontSize": 11,
  //       "labelText": "[[percents]]%",
  //       "lineAlpha": 0.5,
  //       "title": "3. יבוצע בהמשך, בהתאם לתכנון המקורי",
  //       "type": "column",
  //       "valueField": "3. יבוצע בהמשך, בהתאם לתכנון המקורי",
  //       "fillColors": "#F8FF00"

  //     },
  //     {
  //       "valueAxis": "v1",
  //       "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
  //       "fillAlphas": 0.9,
  //       "fontSize": 11,
  //       "labelText": "[[percents]]%",
  //       "lineAlpha": 0.5,
  //       "title": "4. מתעכב מול תכנון מקורי",
  //       "type": "column",
  //       "valueField": "4. מתעכב מול תכנון מקורי",
  //       "fillColors": "#FFC200"

  //     },
  //     {
  //       "valueAxis": "v1",
  //       "balloonText": "[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",
  //       "fillAlphas": 0.9,
  //       "fontSize": 11,
  //       "labelText": "[[percents]]%",
  //       "lineAlpha": 0.5,
  //       "title": "5. בוטל",
  //       "type": "column",
  //       "valueField": "5. בוטל",
  //       "fillColors": "#FF0000"
  //     }
  //     ]
  //     ,
  //     "marginTop": 30,
  //     "marginRight": 0,
  //     "marginLeft": 0,
  //     "marginBottom": 40,
  //     "autoMargins": false,
  //     "categoryField": "field",
  //     "categoryAxis": {
  //       "gridPosition": "start",
  //       "axisAlpha": 0,
  //       "gridAlpha": 0
  //     }
  //   });



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