import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { LoginService } from '../login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  readonly TEXT_PLACEHOLDER_USERNAME = 'Input user';
  readonly TEXT_PLACEHOLDER_PASSWORD = 'Input password';
  readonly TEXT_BUTTON_LOGIN = 'Login!';

  readonly TEXT_ERROR_INVALID_USERNAME_PASSWORD = 'Invalid username or password';
  readonly TEXT_ERROR_SERVER_PROBLEM = 'Server is unavailable';

  private username: string;
  private password: string;

  constructor(private loginService: LoginService, 
              private router: Router) { 
    this.username = "";
    this.password = "";
  }

  ngOnInit() { }

  /*
    Trimms username, runs loginService.login().
    If user registered: navigate to '/home',
    else - handles error
    Finally - clears inputs
  */
  onClickLogin(username, password) {
    let trimmedUsername: string = this.username.trim();
    
    this.loginService.login(trimmedUsername, password)            
                      .subscribe(
                        data => {
                          console.log(`Login: ${data['token']}`);
                          this.router.navigate(['home']);
                        },
                        error => {
                          this.errorHandler(error);
                        });
    this.clearInputs();                  
  }

  /*
    Clears inputs
  */
  private clearInputs() {
    this.username = '';
    this.password = '';
  }

  /*
    Handles login button's errors
  */
  private errorHandler(error) {

    switch (error['_body']) {
      case this.loginService.ERROR_USERNAME_PASS_INVALID:
        alert(this.TEXT_ERROR_INVALID_USERNAME_PASSWORD)
        break;
      
      default:
        alert(this.TEXT_ERROR_SERVER_PROBLEM);
        break;
    }
  }

}
