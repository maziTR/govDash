import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

@Injectable()
export class TablesService {
  user: any;
  private rawData: any[];

  constructor(private http: HttpClient, private AmCharts: AmChartsService) { }

  getUserRequest(): Observable<any> {
    return this.http.get<any>('/api/userDetails');
  }

  getUser() {
    return this.user;
  }

  setUser(user) {
    this.user = user;
  }

  getTables(): Observable<any> {
    return this.http.get<any>('/api/data');
  }

  _createObjectFromArray(sheet, columns) {
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

  _sumFieldCountObjects(array: any[]) {
    // get an array of all the fields
    let allFieldsArr = Object.keys(array[0]);
    let sumOfFieldCount = {};

    for (let i = 1; i < array.length; i++) {
      let currObjKeys = Object.keys(array[i]);
      for (let element of currObjKeys) {
        if (allFieldsArr.indexOf(element) === -1) {
          allFieldsArr.push(element);
        }
      }
    }

    for (let obj of array) {
      for (let field in obj) {
        if (sumOfFieldCount[field]) { // field already exists
          for (let status in obj[field]) {
            if (sumOfFieldCount[field][status]) { // status already exists
              sumOfFieldCount[field][status] += obj[field][status];
            } else {
              sumOfFieldCount[field][status] = obj[field][status];
            }
          }
        } else {
          sumOfFieldCount[field] = obj[field];
        }
      }
    }

    console.log("sumOfFieldCount:");
    console.log(sumOfFieldCount);
    return sumOfFieldCount;
  }

  generateChart(data: any[], columns: any[], titleText: string) {
    let sheet = data[0];
    let arrOfFieldsCount: any[] = [];
    let fieldCount = {};
    let fieldChart = [];
    let outputArray: any[] = [];
    let graphArray: any[];

    for (let i = 0; i < columns.length; i++) {
      arrOfFieldsCount.push(this._createObjectFromArray(sheet, columns[i]));
    }

    // check if we need to calculate more than 2 columns
    if (arrOfFieldsCount.length > 1) {
      fieldCount = this._sumFieldCountObjects(arrOfFieldsCount);
    } else {
      fieldCount = arrOfFieldsCount[0];
    }

    fieldChart = Object.keys(fieldCount[sheet[sheet.length - 1][columns[0][0]]]);
    console.log(fieldCount);

    for (let name in fieldCount) {
      var graphObject = { field: name };
      var taskDetails = fieldCount[name];
      for (status in taskDetails) {
        graphObject[status] = taskDetails[status];
      }
      outputArray.push(graphObject);
    }
    outputArray.unshift(outputArray.pop());
    fieldChart.pop();
    graphArray = this._generateGraphArr(fieldChart);

    return this.outputChart(outputArray, graphArray, titleText);
  }

  _generateGraphArr(statuses: any[]) {
    let returnVal: any[] = [];
    const colors = ['#39aea9', '#fcd96a', '#73D94F', '#de3838', '#fed1b7'];

    for (let i = 0; i < statuses.length; i++) {
      let currJsonObj = {
        "valueAxis": "v1",
        "balloonText": "<span dir='rtl' style='font-size:14px;'>[[title]], [[category]]<br><b>[[value]]</b> ([[percents]]%)</span>",
        "fillAlphas": 0.9,
        "fontSize": 14,
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
    }
    return returnVal;
  }

  outputChart(dataProviderArr: any[], dataGraphArr: any[], titleText: string) {
    const chart = {
      "type": "serial",
      "theme": "light",
      "titles": [{
        "text": titleText,
        "size": 20
      }],
      "legend": {
        "autoMargins": false,
        "borderAlpha": 0.2,
        "equalWidths": false,
        "horizontalGap": 40,
        "markerSize": 10,
        "useGraphSettings": true,
        "valueAlign": "left",
        "valueWidth": 0,
        "fontSize": 14
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
      "marginTop": 60,
      "marginRight": 0,
      "marginLeft": 0,
      "marginBottom": 40,
      "autoMargins": false,
      "export": {
        "enabled": true
      },
      "fontFamily": "Arial, Helvetica, sans-serif",
      "categoryField": "field",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "boldLabels": true,
        "fontSize": 13
      },
      "responsive": {
        "enabled": true
      }
    }
    return chart;
  }

}