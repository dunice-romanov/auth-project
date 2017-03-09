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
    debugger;
    console.log(error);
    console.log(error['non_field_errors'][0]);
  }

}
