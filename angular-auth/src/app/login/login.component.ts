import { Component, OnInit } from '@angular/core';

import { LoginService } from '../login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  token: string;

  observ: any;

  constructor(private loginService: LoginService) { 
    this.username = ""
    this.password = ""
    this.token = ""
    this.observ = ""
  }

  ngOnInit() {
  }

  onClickLogin(username, password) {
    this.loginService.login(username, password)            
                      .subscribe(
                        data => console.log(`Login: ${data['token']  }`),
                        error => this.errorHandler(error));
  }

  onClickRegister(username, password) {
    this.loginService.register(username, password)
                      .subscribe(
                        data => console.log(`Register: ${data['token']}`),
                        error => this.errorHandler(error));
  }

  onClickRefresh(username, password) {
    this.loginService.refreshToken()
                      .subscribe(
                        data => console.log(`Token: ${data['token']}`),
                        error => this.errorHandler(error));
  }


  onClickGetToken() {
    console.log(localStorage.getItem(this.loginService.KEY));
  }

  errorHandler(error) {
    console.log(error);
    // let objError = error.json();
    // let errorString = objError['non_field_errors'][0];
    // debugger;
    // if (objError['non_field_errors'][0] === 'Unable to login with provided credentials.')
    //   alert('Whoops! Re-enter login');
  }

}
