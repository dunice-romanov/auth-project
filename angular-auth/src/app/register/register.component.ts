import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';


import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	readonly TEXT_REGISTER = 'REGISTER';

	private username: string;
	private	password: string;

  constructor(private loginService: LoginService,
  						private router: Router) { 
  	this.username = '';
  	this.password = '';
  }

  ngOnInit() { }

  /*
  	Trimms inputs, runs loginService.register.
  	If user registered: navigate to '/home',
  	else - handles error
  	Finally - clears inputs
  */
  onClickRegister(username, password) {
  	let trimmedUsername = this.username.trim();
  	let trimmedPassword = this.password.trim();
  	this.loginService.register(trimmedUsername, trimmedPassword)
  										.subscribe(
  											data => {
  												console.log(`Register: ${data['token']}`);
  												this.router.navigate(['home']);
  											},
  											error => this.errorHandler(error)
  											);


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
  	Handles errors from loginService
  */
  private errorHandler(error) {
  	console.log(error);
  }

}
