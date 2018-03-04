import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { TablesService } from './tables.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private authService: AuthService,private tableService: TablesService, public router: Router) { }
  
  ngOnInit() {
    this.tableService.getFiles().subscribe(data => {
      data => {if(!data){
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/login';
        let navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      }
      else{
        this.files = data;
        console.log(this.files);
      }
    }}
    );
  }

  files: any[] = [];
  sheets: any[] = [];
  inputText: string;

  getSheets() {
    console.log(this.inputText);
    this.tableService.getTables(this.inputText).subscribe(data => {
      this.sheets = data;
      console.log(this.sheets);
    })
  }

}