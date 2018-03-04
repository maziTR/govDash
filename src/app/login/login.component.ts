import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:{};
  token:string;
  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.user).subscribe(
      data => {this.authService.setLocalStorage(data.token)
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
        let navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      }
    )
  }
}
