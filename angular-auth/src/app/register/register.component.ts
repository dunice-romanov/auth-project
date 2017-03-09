import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';


import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	readonly TEXT_REGISTER = 'Register';

	private username: string;
	private	password: string;

  constructor(private loginService: LoginService,
  						private router: Router) { 
  	this.username = '';
  	this.password = '';
  }

  ngOnInit() { }

  /*
  	Trimms username, runs loginService.register().
  	If user registered: navigate to '/home',
  	else - handles error
  	Finally - clears inputs
  */
  onClickRegister(username, password) {
  	let trimmedUsername = this.username.trim();
  	this.loginService.register(trimmedUsername, password)
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
  	Handles register button's errors
  */
  private errorHandler(error) {
    debugger;
    console.log(error);
    console.log(error['non_field_errors']);
  }

}
