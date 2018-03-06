import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { TablesService } from './tables.service';
import { Router } from '@angular/router';
import { ChartsCalculationsService } from './charts-calculations.service';

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

  constructor(private tableService: TablesService, 
              private authService: AuthService,
              private chartscalculationsService: ChartsCalculationsService,
              public router: Router) { }
  
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
  getField() {
   this.chartscalculationsService.getSheets()
  }
}