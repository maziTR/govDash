import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

@Injectable()
export class ChartsService {
  private rawData: any[];

  constructor(private http: HttpClient, private AmCharts: AmChartsService) { }

  getTablesRequest(): Observable<any> {
    return this.http.get<any>('/api/data');
  }

  getTables(): any[] {
    return this.rawData;
  }

  setTables(data) {
    this.rawData = data;
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
    // console.log(fieldCount);

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

    // sort the fields (x axis) of the bar chart
    outputArray.sort(function (a, b) {
      if (parseInt(a.field)) {
        return parseInt(a.field) - parseInt(b.field);
      }
      return a.field.localeCompare(b.field);
    });

    // Pie generator only for debug
    this.generatePie(data, [105, 105], titleText)

    return this._outputChart(outputArray, graphArray, titleText);
  }

  createFilter(filterFieldsArr: any[]) {
    let firstRowValues = this.rawData[0][0];
    return filterFieldsArr.map(element => {
      let i = firstRowValues.indexOf(element);
      return { column: i, optionName: element };
    });
  }

  private _createObjectFromArray(sheet, columns) {
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
    return groupedObject;
  }

  private _sumFieldCountObjects(array: any[]) {
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
    return sumOfFieldCount;
  }

  private _generateGraphArr(statuses: any[]) {
    let returnVal: any[] = [];
    const colors = ['#3b7eb3', '#fcd96a', '#7ba8cc', '#FF9800', '#FFC107'];
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

  private _outputChart(dataProviderArr: any[], dataGraphArr: any[], titleText: string) {
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

  generatePie(data: any[], column, titleText: string) {
    // object for Pie chart
    let sheet = data[0];
    let objectPie = this._createObjectPieFromArray(sheet, column);
    return this._generatePieArr(objectPie, titleText);
  }

  // generate object for pie chart 
  private _createObjectPieFromArray(sheet, column) {
    let groupedObject = {};
    for (var i = 1; i < sheet.length; i++) {
      var field = sheet[i][column];
      if (field) {
        if (groupedObject[field]) {
          groupedObject[field]++;
        } else {
          groupedObject[field] = 1;
        }
      }
    }
    return groupedObject;
  }

  private _generatePieArr(objectPie: any, titleText: string) {
    let jsonObj = {
      "type": "pie",
      "theme": "light",
      "titles": [{
        "text": titleText,
        "size": 20
      }],
      "dataProvider": [],
      "fontFamily": "Arial, Helvetica, sans-serif",
      "marginTop": 60,
      "marginBottom": 30,
      "fontSize": 16,
      "titleField": "title",
      "valueField": "value",
      "labelRadius": 20,
      "radius": "42%",
      "innerRadius": "60%",
      "labelText": "[[title]]",
      "balloonText": "<span dir='rtl'>[[title]]<br><b>[[value]]</b> ([[percents]]%)</span>",
      "export": {
        "enabled": true
      }
    }

    for (let pieData in objectPie) {
      let currVal = objectPie[pieData];
      let pieObject = { "title": pieData, "value": currVal };
      jsonObj.dataProvider.push(pieObject);

      jsonObj.dataProvider.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
    }
    return jsonObj;
  }
}