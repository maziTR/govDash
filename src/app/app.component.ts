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
      console.log(this.sheets);
    })
  }

}