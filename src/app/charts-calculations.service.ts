import { Injectable } from '@angular/core';
import { TablesService } from './tables.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChartsCalculationsService {
  sheets: any[] = [];
  // status: string
  
  constructor(private tableService: TablesService) { }
  
  getSheets() {
    // this.tableService.getTables().subscribe(data => {
    //   this.sheets = data; 
    //   var sheet = this.sheets[0]
    //   console.log(this.sheets)

    //   var field_count = {};

    //   // var field_array = [];
    //   // var chart_array = [];
    //   for (var i=1; i<sheet.length; i++){    
    //     var field = sheet[i][3];
    //     var status = sheet[i][105];
    //     if (status) {
    //       if(field_count[field]) {
    //         if (field_count[field][status]) {
    //           field_count[field][status]++
    //         }
    //         else {
    //           field_count[field][status]=1; 
    //         }

    //       }else{
    //         field_count[field] = {};
    //         field_count[field][status] = 1
    //       }
    //     }
    //     // return field_count
    //   }
    //   console.log(field_count);
    //   var output_array = [];

    //   for(var name in field_count){ 

    //   var graph_object ={task_type: name};
    //     var task_details = field_count[name]; 
    //     for (status in task_details){
    //      graph_object[status] = task_details[status]
    //     }
    //     output_array.push(graph_object)
    //   }
    //   console.log(output_array)
    //   return output_array

    // })
  }

}
