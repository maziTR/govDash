import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TablesService } from './tables.service';
import { BarChartComponent } from './bar-chart/bar-chart.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  files: any[] = [];
  sheets: any[] = [];
  inputText: string;

  constructor(private authService: AuthService,private tableService: TablesService, public router: Router) { }
  
  ngOnInit() {
/*     this.authService.fetchUserDetails().subscribe(
      data => console.log(data)
    ); */
  //  this.tableService.getFiles().subscribe(data => {
  //     this.files = data;
  //     console.log(this.files);
  //   });
  }

  login(){
/*     this.tableService.getFiles().subscribe(data => {
      this.files = data;
      console.log(this.files);
    }); */
  }

  // getSheets() {
  //   console.log(this.inputText);
  //   this.tableService.getTables(this.inputText).subscribe(data => {
  //     this.sheets = data;
  //     console.log(this.sheets);
  //   })
  // }
}