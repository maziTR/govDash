import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { TablesService } from './tables.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  // to be removed later
  files: any[] = [];
  sheets: any[] = [];
  showLoginButton: boolean = true;
  inputText: string;

  constructor(private tableService: TablesService, private authService: AuthService, public router: Router) { }
  
  ngOnInit() {
    this.authService.fetchUserDetails().subscribe(
      data => console.log(data)
    );

    // to be removed later
    this.showLoginButton = true;
    this.tableService.getFiles().subscribe(data => {
      this.files = data;
      console.log(this.files);
      this.showLoginButton = false;
    });
  }
  
  // to be removed later
  getSheets() {
    console.log(this.inputText);
    this.tableService.getTables(this.inputText).subscribe(data => {
      this.sheets = data;      
      var sheet = this.sheets[0]
      var field_count = {}
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

      }

      // var healthData = this.sheets.filter(field => field.length < 10)
      console.log(JSON.stringify(field_count))



    })
  }

}