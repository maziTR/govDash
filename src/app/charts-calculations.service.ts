import { Injectable } from '@angular/core';
import { TablesService } from './tables.service';
//import  DATA  from './data';

@Injectable()
export class ChartsCalculationsService {
  sheets: any[] = [];


  constructor(private tableService: TablesService) { }
  getSheets() {
  //  this.tableService.getTables().subscribe(data => {
     // this.sheets = DATA; 
      console.log(this.sheets)
      var sheet = this.sheets[0]
      var field_count = {};
      var field_array = [];
      var chart_array = [];
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
      field_array.push(field_count)
      for(var i=0; i<field_array.length; i++) {
        var eachField = field_array[i] 
      }
      console.log(field_array[0])
      console.log(field_array)
    
  }
}
